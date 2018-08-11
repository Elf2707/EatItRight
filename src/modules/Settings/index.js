// @flow
import React from 'react';
import {
  Animated, ScrollView, Keyboard, UIManager, View, StyleSheet, Text,
  TouchableOpacity,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Jiro } from 'react-native-textinput-effects';

import { colors, SegmentedControl } from '../../common/ui';

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

  onSaveSettings = () => {

  }

  renderInputs() {
    const { name, protein, fat, carbohydrate, weight } = this.state;

    return (
      <View>
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Вес,кг"
          borderColor={colors.blue1}
          value={name}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ name: text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Рост,см"
          borderColor={colors.blue1}
          value={protein}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ protein: text })}
        />

        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Обхват талии,см"
          borderColor={colors.blue1}
          value={fat}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ fat: text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Возраст"
          borderColor={colors.blue1}
          value={carbohydrate}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ carbohydrate: text })}
        />
      </View>
    );
  }

  renderSegmentControls() {
    return (
      <View style={styles.segmentedCont}>
        <SegmentedControl
          style={styles.segmentControl}
          values={['male', 'female']}
          selectedIndex={0}
        />
        <SegmentedControl
          values={['minimum', 'medium', 'hard', 'very hard', 'extremal']}
          selectedIndex={0}
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
          keyboardShouldPersistTaps="never"
        >
          {this.renderSegmentControls()}
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
    paddingTop: 20,
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

  segmentedCont: {
    paddingHorizontal: 20,
  },

  segmentControl: {
    marginBottom: 16,
  },
});
