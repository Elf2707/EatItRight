// @flow
import React from 'react';
import { Animated, Text } from 'react-native';

import ExStyleSheet from './ExStyleSheet';
import colors from './colors';

const SHOW_TIME = 5000;
const MIN_SCALE = 0.3;

type Props = {
  style?: Object,
  message: string,
  onClose: () => void,
};

type State = {
  animValue: Animated.Value,
};

export default class ErrorView extends React.Component<Props, State> {
  showTimer: TimeoutID;

  state = {
    animValue: new Animated.Value(MIN_SCALE),
  };

  componentDidMount() {
    Animated.timing(this.state.animValue, {
      toValue: 1,
      duration: 350,
    }).start(() => {
      this.showTimer = setTimeout(() => this.hide(), SHOW_TIME);
    });
  }

  componentWillUnmount() {
    clearTimeout(this.showTimer);
    this.props.onClose();
  }

  hide = () => {
    Animated.timing(this.state.animValue, {
      toValue: MIN_SCALE,
    }).start(() => this.props.onClose());
  };

  render() {
    const { style, message } = this.props;
    const { animValue } = this.state;

    const opacity = animValue.interpolate({
      inputRange: [MIN_SCALE, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          style,
          { transform: [{ scale: this.state.animValue }], opacity },
        ]}
      >
        <Text style={styles.msgText}>
          {message}
        </Text>
      </Animated.View>
    );
  }
}

const styles = ExStyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderColor: colors.mainLight,
    borderWidth: 2,
  },

  msgText: {
    fontSize: 16,
    color: colors.mainLight,
  },
});
