// @flow
import React from 'react';
import {
  Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Interactable from 'react-native-interactable';

import { colors } from '../../../common/ui';
import images from '../../../common/assets/images';

const Screen = Dimensions.get('window');

type Props = {
  style?: Object,
  item: FoodItemData,
  componentId: string,
};

type State = {
  animValue: Animated.Value,
};

export default class FoodItem extends React.Component<Props, State> {
  interactableElem: Interactable;

  state = {
    animValue: new Animated.Value(0),
  };

  onAddFoodItemPress = () => {
    this.interactableElem.snapTo({ index: 0 });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'screens.EditFoodItem',
        passProps: {
          item: this.props.item,
          isEditMode: false,
        },
      },
    });
  };

  renderButtons() {
    const { animValue } = this.state;
    const translateX = animValue.interpolate({
      inputRange: [-70, 0],
      outputRange: [0, 70],
    });

    const scale = animValue.interpolate({
      inputRange: [-70, 0],
      outputRange: [1, 0.2],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={styles.btnCont}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            styles.animBtnCont,
            { transform: [{ translateX }, { scale }] },
          ]}
        >
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={this.onAddFoodItemPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image style={styles.btnIcon} source={images.addFoodIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  renderContent() {
    const { item } = this.props;

    return (
      <View style={styles.content}>
        <Text
          style={styles.nameText}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <View style={styles.itemParamsCont}>
          <Text style={styles.itemParamsText}>
            <Text style={styles.itemParamsHeaderText}>P: </Text>
            {item.protein}
          </Text>
          <Text style={styles.itemParamsText}>
            <Text style={styles.itemParamsHeaderText}>F: </Text>
            {item.fat}
          </Text>
          <Text style={styles.itemParamsText}>
            <Text style={styles.itemParamsHeaderText}>C: </Text>
            {item.carbohydrate}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderButtons()}

        <Interactable.View
          // eslint-disable-next-line no-return-assign
          ref={r => this.interactableElem = r}
          horizontalOnly
          snapPoints={[
            { x: 0, damping: 0.6, tension: 300 },
            { x: -70, damping: 0.6, tension: 300 },
          ]}
          boundaries={{ right: 0 }}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStopMoving}
          dragToss={0.01}
          animatedValueX={this.state.animValue}
        >
          {this.renderContent()}
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
  },

  content: {
    height: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },

  nameText: {
    flex: 1,
    fontSize: 18,
    color: colors.mainText,
  },

  itemParamsCont: {
    flex: 1,
    flexDirection: 'row',
  },

  itemParamsText: {
    fontSize: 16,
    color: colors.mainText,
    marginRight: 20,
  },

  itemParamsHeaderText: {
    fontSize: 16,
    color: colors.subText,
  },

  animBtnCont: {
    position: 'absolute',
    top: 0,
    left: Screen.width - 70,
    width: Screen.width,
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
    backgroundColor: colors.mainDark,
  },

  btnCont: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors.mainDark,
  },

  btnIcon: {
    width: 40,
    height: 40,
  },
});
