// @flow
import React from 'react';
import { Animated, ScrollView, Keyboard, UIManager, View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Jiro } from 'react-native-textinput-effects';

import { colors } from '../../common/ui';

const INPUT_H = 80;
const KEYBOARD_OFFSET = 70;

type Props = {
  foodsStore: FoodsStoreData,
};

type State = {
  inputYPos: number,
  animValue: Animated.Value,
};

@inject('foodsStore')
@observer
export default class Settings extends React.Component<Props, State> {
  keyboardDidShowListener: KeyboardEventListener;
  keyboardDidHideListener: KeyboardEventListener;
  scrollView: ScrollView;

  state = {
    inputYPos: 0,
    animValue: new Animated.Value(0),
  };

  componentDidMount() {
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

  onFocus = ({ nativeEvent }: OnFocusEvent) => {
    this.setState({ inputYPos: 0 });
    UIManager.measure(nativeEvent.target, (ox, oy, width, height, px, py) => {
      this.setState({ inputYPos: py });
    });
  };

  renderInputs() {
    const { name, protein, fat, carbohydrate, weight } = this.state;

    return (
      <View>
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
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Protein"
          borderColor={colors.protein}
          value={protein}
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
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ carbohydrate: text })}
        />
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
      </View>
    );
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          // eslint-disable-next-line no-return-assign
          ref={r => this.scrollView = r}
        >
          {this.renderInputs()}

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
    width: '100%',
    paddingTop: 16,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray1,
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
});
