// @flow
import React from 'react';
import {
  Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Interactable from 'react-native-interactable';

import { colors, FoodIngredient } from '../../../common/ui';
import images from '../../../common/assets/images';

const Screen = Dimensions.get('window');
const BUTTON_W = 70;

type Props = {
  style?: Object,
  item: FoodItemData,
  componentId: string,
  deleteFoodItem: () => void,
};

type State = {
  animValue: Animated.Value,
};

export default class FoodItem extends React.Component<Props, State> {
  interactableElem: Interactable;

  state = {
    animValue: new Animated.Value(0),
  };

  onAddFoodItem = () => {
    this.interactableElem.snapTo({ index: 0 });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'screens.EditFoodItem',
        passProps: { item: this.props.item },
      },
    });
  };

  onEditItem = () => {
    this.interactableElem.snapTo({ index: 0 });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'screens.EditFoodItem',
        passProps: {
          item: this.props.item,
          isEditFoodItemMode: true,
        },
      },
    });
  };

  renderAteButton() {
    const { animValue } = this.state;
    const translateX = animValue.interpolate({
      inputRange: [-BUTTON_W * 3, 0],
      outputRange: [0, BUTTON_W * 3],
    });

    const scale = animValue.interpolate({
      inputRange: [-BUTTON_W * 3, 0],
      outputRange: [1, 0.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.ateBtnCont, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={this.onAddFoodItem}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Animated.Image
            style={[styles.btnIcon, { transform: [{ scale }] }]}
            source={images.addFoodIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderEditButton() {
    const { animValue } = this.state;
    const translateX = animValue.interpolate({
      inputRange: [-BUTTON_W * 3, 0],
      outputRange: [0, BUTTON_W * 2],
    });

    const scale = animValue.interpolate({
      inputRange: [-BUTTON_W * 3, 0],
      outputRange: [1, 0.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.editBtnCont, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={this.onEditItem}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Animated.Image
            style={[styles.btnIcon, { transform: [{ scale }] }]}
            source={images.editIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderDeleteButton() {
    const { animValue } = this.state;
    const translateX = animValue.interpolate({
      inputRange: [-BUTTON_W * 3, 0],
      outputRange: [0, BUTTON_W],
    });

    const scale = animValue.interpolate({
      inputRange: [-BUTTON_W * 3, 0],
      outputRange: [1, 0.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.deleteBtnCont, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => this.props.deleteFoodItem()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Animated.Image
            style={[styles.btnIcon, { transform: [{ scale }] }]}
            source={images.deleteIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderButtons() {
    return (
      <View
        style={styles.btnsCont}
        pointerEvents="box-none"
      >
        {this.renderAteButton()}
        {this.renderEditButton()}
        {this.renderDeleteButton()}
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
          <FoodIngredient
            style={styles.ingredient}
            backgroundColor={colors.protein}
            text={`P: ${item.protein}`}
          />

          <FoodIngredient
            style={styles.ingredient}
            backgroundColor={colors.fat}
            text={`F: ${item.fat}`}
          />

          <FoodIngredient
            style={styles.ingredient}
            backgroundColor={colors.carbohydrate}
            text={`C: ${item.carbohydrate}`}
          />
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
            { x: -BUTTON_W * 3, damping: 0.6, tension: 300 },
          ]}
          boundaries={{ right: 0 }}
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

  ingredient: {
    marginRight: 10,
  },

  btnsCont: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors.blue1,
  },

  ateBtnCont: {
    position: 'absolute',
    top: 0,
    left: Screen.width - (BUTTON_W * 3),
    width: Screen.width,
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
    backgroundColor: colors.blue1,
  },

  editBtnCont: {
    position: 'absolute',
    top: 0,
    left: Screen.width - (BUTTON_W * 2),
    width: Screen.width,
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
    backgroundColor: colors.magenta1,
  },

  deleteBtnCont: {
    position: 'absolute',
    top: 0,
    left: Screen.width - BUTTON_W,
    width: Screen.width,
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center',
    backgroundColor: colors.mainDark,
  },

  btnIcon: {
    width: 40,
    height: 40,
  },
});
