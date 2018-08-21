// @flow
import React from 'react';
import { ART, StyleSheet, View, Dimensions } from 'react-native';
import Morph from 'art/morph/path';

const { Surface, Shape } = ART;

const ICON_W = 70;
const ICON_H = 70;
const MOVE_D = 2;
const POS_LEFT_UP_OS = 16;
const POS_RIGHT_BOTTOM_OS = 24;
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type Props = {
  style?: Object,
  svgIcons: Array<SvgIconData>,
};

type State = {
  isForward: boolean,
  transition: Morph.Tween,
  posY: number,
  posX: number,
  moveUp: boolean,
  moveLeft: boolean,
};

export default class SvgMorph extends React.Component<Props, State> {
  stopAnimation: boolean;

  state = {
    isForward: true,
    transition: Morph.Tween(
      this.props.svgIcons[0].path,
      this.props.svgIcons[1].path
    ),
    posY: random(0, SCREEN_H - ICON_H),
    posX: random(0, SCREEN_W - ICON_W),
    moveUp: random(0, 100) > 50,
    moveLeft: random(0, 100) > 50,
  };

  componentDidMount() {
    this.animate(null, this.nextAnimation);
    this.stopAnimation = false;
  }

  componentWillUnmount() {
    this.stopAnimation = true;
  }

  nextAnimation = () => {
    const { svgIcons } = this.props;
    const { isForward } = this.state;

    if (this.stopAnimation) return;

    this.setState({
      isForward: !isForward,
      transition: Morph.Tween(
        svgIcons[!isForward ? 0 : 1].path,
        svgIcons[!isForward ? 1 : 0].path
      ),
    }, () => this.animate(null, this.nextAnimation));
  }

  animate = (start: ?number, cb: ()=> void) => {
    requestAnimationFrame((timestamp: number) => {
      const { transition } = this.state;
      const newStartTime = start || timestamp;
      const delta = (timestamp - newStartTime) / 1000;

      if (this.stopAnimation) return;

      if (delta > 1) {
        cb();
      } else {
        transition.tween(delta);
        if (this.stopAnimation) return;
        this.setState(this.getNextIconCoords());
        this.animate(newStartTime, cb);
      }
    });
  }

  getNextIconCoords = () => {
    const { posX, posY, moveUp, moveLeft } = this.state;

    let newPosX = posX;
    let newPosY = posY;
    let newMoveUp = moveUp;
    let newMoveLeft = moveLeft;

    if (moveUp) {
      if (posY <= -POS_LEFT_UP_OS) {
        newMoveUp = false;
        newPosY += MOVE_D;
      } else {
        newPosY -= MOVE_D;
      }
    } else if (posY >= SCREEN_H - ICON_H + POS_RIGHT_BOTTOM_OS) {
      newMoveUp = true;
      newPosY -= MOVE_D;
    } else {
      newPosY += MOVE_D;
    }

    if (moveLeft) {
      if (posX <= -POS_LEFT_UP_OS) {
        newMoveLeft = false;
        newPosX += MOVE_D;
      } else {
        newPosX -= MOVE_D;
      }
    } else if (posX >= SCREEN_W - ICON_W + POS_RIGHT_BOTTOM_OS) {
      newMoveLeft = true;
      newPosX -= MOVE_D;
    } else {
      newPosX += MOVE_D;
    }

    return {
      posX: newPosX,
      posY: newPosY,
      moveUp: newMoveUp,
      moveLeft: newMoveLeft,
    };
  };

  render() {
    const { svgIcons } = this.props;
    const { isForward, transition, posX, posY } = this.state;

    const iconScale = svgIcons[!isForward ? 0 : 1].scale;
    const iconStroke = svgIcons[!isForward ? 0 : 1].stroke;
    const iconFill = svgIcons[!isForward ? 0 : 1].fill;
    const iconStrokeW = svgIcons[!isForward ? 0 : 1].strokeWidth;

    return (
      <View
        style={[
          styles.container,
          this.props.style,
          { left: posX, top: posY },
        ]}
      >
        <Surface width={ICON_W} height={ICON_H}>
          <Shape
            d={transition}
            stroke={iconStroke}
            strokeWidth={iconStrokeW}
            scale={iconScale}
            fill={iconFill}
          />
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: ICON_W,
    height: ICON_H,
  },
});

function random(min: number, max: number): number {
  return min + (Math.random() * ((max + 1) - min));
}

type SvgIconData = {
  path: string,
  fill?: string,
  stroke?: string,
  strokeWidth?: number,
  x?: number,
  y?: number,
  scale?: number,
};
