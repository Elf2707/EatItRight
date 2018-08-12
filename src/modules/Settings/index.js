// @flow
import React from 'react';
import {
  Animated, ScrollView, Keyboard, UIManager, View, StyleSheet, Text,
  TouchableOpacity, Dimensions,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Jiro } from 'react-native-textinput-effects';

import { colors, SegmentedControl } from '../../common/ui';

const SCREEN_H = Dimensions.get('window').height;
const INPUT_H = 80;
const KEYBOARD_OFFSET = 70;

type Props = {
  foodsStore: FoodsStoreData,
};

type State = {
  sexIndex: number,
  lifeStyleIndex: number,
  weight: number,
  height: number,
  waist: number,
  age: number,
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
    sexIndex: 0,
    lifeStyleIndex: 0,
    weight: 80,
    height: 180,
    waist: 90,
    age: 30,
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
        toValue: e.endCoordinates.height,
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

  onSexChange = ({ nativeEvent }: OnSegmentChange) => this.setState({
    sexIndex: nativeEvent.selectedSegmentIndex,
  });

  onLifeStyleChange = ({ nativeEvent }: OnSegmentChange) => this.setState({
    lifeStyleIndex: nativeEvent.selectedSegmentIndex,
  });

  onSaveSettings = () => {

  };

  renderInputs() {
    const { weight, height, waist, age } = this.state;

    return (
      <View>
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Вес,кг"
          borderColor={colors.blue1}
          value={`${weight}`}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ weight: +text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Рост,см"
          borderColor={colors.blue1}
          value={`${height}`}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ height: +text })}
        />

        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Обхват талии,см"
          borderColor={colors.blue1}
          value={`${waist}`}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ waist: +text })}
        />
        <Jiro
          style={styles.inputCont}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
          label="Возраст"
          borderColor={colors.blue1}
          value={`${age}`}
          selectionColor={colors.white}
          onFocus={this.onFocus}
          onChangeText={text => this.setState({ age: +text })}
        />
      </View>
    );
  }

  renderSegmentControls() {
    return (
      <View style={styles.segmentedCont}>
        <Text style={styles.segmentLabelText}>Пол:</Text>
        <SegmentedControl
          style={styles.segmentControl}
          values={['Мужчина', 'Женщина']}
          onChange={this.onSexChange}
          selectedIndex={this.state.sexIndex}
        />

        <Text style={styles.segmentLabelText}>
          Уровень физической нагрузки:
        </Text>
        <SegmentedControl
          values={[
            'Минимальный',
            'Средний',
            'Тяжелый',
            'Очень тяжелый',
            'Экстремальный',
          ]}
          onChange={this.onLifeStyleChange}
          selectedIndex={this.state.lifeStyleIndex}
        />
      </View>
    );
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          // eslint-disable-next-line no-return-assign
          ref={r => this.scrollView = r}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="never"

        >
          {this.renderSegmentControls()}
          {this.renderInputs()}

          <Animated.View style={{ height: this.state.animValue }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
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
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  segmentControl: {
    marginBottom: 16,
  },

  segmentLabelText: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.gray3,
    marginBottom: 4,
  },
});
