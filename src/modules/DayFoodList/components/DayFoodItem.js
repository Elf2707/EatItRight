// @flow
import React from 'react';
import {
  Animated, View, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Interactable from 'react-native-interactable';
import moment from 'moment';

import { colors, FoodIngredient } from '../../../common/ui';
import images from '../../../common/assets/images';

const Screen = Dimensions.get('window');
const BUTTON_W = 70;

type Props = {
  style?: Object,
  item: DayFoodItemData,
  componentId: string,
  deleteDayFoodItem: () => void,
};

type State = {
  animValue: Animated.Value,
};

export default class DayFoodItem extends React.Component<Props, State> {
  interactableElem: Interactable;

  state = {
    animValue: new Animated.Value(0),
  };

  onDeleteItem = () => {};

  onEditItem = () => {
    this.interactableElem.snapTo({ index: 0 });
    Navigation.push(this.props.componentId, {
      component: {
        name: 'screens.EditFoodItem',
        passProps: {
          item: this.props.item,
          isEditDayItemMode: true,
        },
      },
    });
  };

  renderEditButton() {
    const { animValue } = this.state;
    const translateX = animValue.interpolate({
      inputRange: [-BUTTON_W * 2, 0],
      outputRange: [0, BUTTON_W * 1],
    });

    const scale = animValue.interpolate({
      inputRange: [-BUTTON_W * 2, 0],
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
      inputRange: [-BUTTON_W * 2, 0],
      outputRange: [0, BUTTON_W],
    });

    const scale = animValue.interpolate({
      inputRange: [-BUTTON_W * 2, 0],
      outputRange: [1, 0.2],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.deleteBtnCont, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={this.props.deleteDayFoodItem}
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
        {this.renderEditButton()}
        {this.renderDeleteButton()}
      </View>
    );
  }

  renderContent() {
    const { item } = this.props;

    return (
      <View style={styles.content}>
        <Text style={styles.timeText}>
          {moment(item.added_at).format('HH:mm')}
        </Text>
        <View style={styles.itemInfoCont}>
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
        <Text style={styles.weightText}>
          {`${item.weight}г`}
        </Text>
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
            { x: -BUTTON_W * 2, damping: 0.6, tension: 300 },
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
    borderBottomColor: colors.gray1,
    borderBottomWidth: 1,
  },

  content: {
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  timeText: {
    textAlign: 'center',
    color: colors.subText1,
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemInfoCont: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 16,
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

  weightText: {
    fontSize: 18,
    color: colors.mainText,
  },

  btnsCont: {
    position: 'absolute',
    right: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors.magenta1,
    overflow: 'hidden',
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
