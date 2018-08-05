// @flow
import React from 'react';
import {
  Animated, View, StyleSheet, Text, TouchableOpacity, ScrollView, Keyboard,
  UIManager,
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';
import { Jiro } from 'react-native-textinput-effects';

import { colors } from '../../common/ui';

const INPUT_H = 80;
const KEYBOARD_OFFSET = 70;

type Props = {
  style?: Object,
  item: FoodItemData | DayFoodItemData,
  isEditMode: boolean,
  componentId: string,
};

type State = {
  name: string,
  protein: string,
  fat: string,
  carbohydrate: string,
  weight: string,
  inputYPos: number,
  animValue: Animated.Value,
};

@inject('foodsStore')
@observer
export default class EditFoodItem extends React.Component<Props, State> {
  keyboardDidShowListener: KeyboardEventListener;
  keyboardDidHideListener: KeyboardEventListener;
  scrollView: ScrollView;

  state = {
    name: this.props.item.name,
    protein: `${this.props.item.protein}`,
    fat: `${this.props.item.fat}`,
    carbohydrate: `${this.props.item.carbohydrate}`,
    weight: '',
    inputYPos: 0,
    animValue: new Animated.Value(0),
  };

  componentDidMount() {
    const { item } = this.props;
    const titleText = item.name.length >= 20
      ? `${item.name.substr(0, 17)}...` : item.name;

    Navigation.mergeOptions(this.props.componentId, {
      topBar: { title: { text: titleText } },
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.onKeyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onKeyboardDidShow = (e: OnKeyboardEvent) => {
    const inputPos = this.state.inputYPos + INPUT_H + KEYBOARD_OFFSET;

    if (e.endCoordinates.screenY < inputPos) {
      Animated.timing(this.state.animValue, {
        toValue: e.endCoordinates.screenY - inputPos,
        duration: 250,
      }).start(() => this.scrollView.scrollToEnd());
    }
  };

  onKeyboardDidHide = () => {
    Animated.timing(this.state.animValue, {
      toValue: 0,
      duration: 250,
    }).start(() => this.setState({ inputYPos: 0 }));
  };

  onAddPress = () => {
    const { name, protein, fat, carbohydrate, weight } = this.state;
    if (name === '' || protein === '' || fat === '' || carbohydrate === ''
      || weight === '') {
      return;
    }

    this.props.foodsStore.addNewDayFoodItem({
      name,
      protein,
      fat,
      carbohydrate,
      weight,
      added_at: new Date(),
    });
    Navigation.pop(this.props.componentId);
  };

  onFocus = ({ nativeEvent }: OnFocusEvent) => {
    this.setState({ inputYPos: 0 });
    UIManager.measure(nativeEvent.target, (ox, oy, width, height, px, py) => {
      this.setState({ inputYPos: py });
      // console.log('tttttttttt --- 0');
      // console.log(ox, oy, width, height, px, py);
      // console.log('tttttttttt --- 1');
    });
  };

  renderInputs() {
    const { isEditMode } = this.props;
    const { name, protein, fat, carbohydrate, weight } = this.state;

    return (
      <View>
        {isEditMode && (
          <Jiro
            style={styles.inputCont}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            label="Name"
            borderColor={colors.weight}
            value={name}
            selectionColor={colors.white}
            onFocus={this.onFocus}
            onChangeText={text => this.setState({ name: text })}
          />
        )}

        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Protein"
          borderColor={colors.protein}
          value={protein}
          editable={isEditMode}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ protein: text })}
        />

        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Fat"
          borderColor={colors.fat}
          value={fat}
          editable={isEditMode}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ fat: text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Carbohydrate"
          borderColor={colors.carbohydrate}
          value={carbohydrate}
          editable={isEditMode}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ carbohydrate: text })}
        />
        {!isEditMode && (
          <Jiro
            style={styles.inputCont}
            inputStyle={styles.input}
            labelStyle={styles.inputLabel}
            label="Weight"
            borderColor={colors.weight}
            value={weight}
            selectionColor={colors.white}
            onFocus={this.onFocus}
            onChangeText={text => this.setState({ weight: text })}
          />
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView
          // eslint-disable-next-line no-return-assign
          ref={r => this.scrollView = r}
        >
          {this.renderInputs()}

          <TouchableOpacity
            style={styles.btn}
            color={colors.white}
            onPress={this.onAddPress}
          >
            <Text style={styles.btnText}>
              {this.props.isEditMode ? 'Save' : 'Add'}
            </Text>
          </TouchableOpacity>

          <Animated.View
            style={{ height: Animated.multiply(this.state.animValue, -1) }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },

  inputCont: {
    marginBottom: 8,
    width: '100%',
  },

  input: {
    color: colors.white,
  },

  inputLabel: {
    fontSize: 16,
  },

  btn: {
    backgroundColor: colors.mainDark,
    width: 90,
    height: 45,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },

  btnText: {
    fontSize: 20,
    color: colors.white,
  },
});
