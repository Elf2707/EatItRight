// @flow
import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import colors from '../colors';

type Props = {
  style?: Object,
  values: Array<string>,
  onValueChange: (value: string, index: number) => void,
  selectedIndex: number,
  tintColor: string,
  enabled?: boolean,
};

type State = {
  currentIndex: number,
};

export default class SegmentedControl extends React.Component<Props, State> {
  static defaultProps = {
    enabled: true,
    tintColor: colors.blue1,
    selectedIndex: 0,
  };

  state = {
    currentIndex: this.props.selectedIndex,
  };

  onChange = (value: string, index: number) => {
    const { onValueChange } = this.props;

    this.setState({ currentIndex: index });
    if (onValueChange) {
      onValueChange(value);
    }

    if (onValueChange) {
      onValueChange(value, index);
    }
  }

  renderButtons() {
    const { values, tintColor, enabled } = this.props;
    const { currentIndex } = this.state;

    return values.map((buttonTitle, index) => {
      const textColor = index === currentIndex ? colors.white : tintColor;
      const borderLeft = index > 0
        ? { borderLeftWidth: 1, borderLeftColor: tintColor } : null;

      const btnContainerStyle = [styles.btnContainer, borderLeft];
      if (index === currentIndex) {
        btnContainerStyle.push({ backgroundColor: tintColor });
      }

      if (index === 0) {
        btnContainerStyle.push(styles.leftBtn);
      }

      if (index === values.length - 1) {
        btnContainerStyle.push(styles.rightBtn);
      }

      const underlayColor = `${tintColor.substr(0, 7)}${55}`;

      return (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={btnContainerStyle}
        >
          <TouchableHighlight
            style={styles.btn}
            onPress={() => this.onChange(buttonTitle, index)}
            underlayColor={underlayColor}
            disabled={!enabled}
          >
            <Text
              style={[styles.btnTitle, { color: textColor }]}
              numberOfLines={1}
            >
              {buttonTitle.replace(/\b./g, l => l.toUpperCase())}
            </Text>
          </TouchableHighlight>
        </View>
      );
    });
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderColor: colors.blue1,
    borderRadius: 5,
    borderWidth: 1,
    height: 28,
    overflow: 'hidden',
  },

  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.white,
    borderLeftWidth: 1,
    borderLeftColor: colors.blue1,
    borderRightWidth: 1,
    borderRightColor: colors.blue1,
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnTitle: {
    fontSize: 15,
    color: colors.blue1,
  },

  leftBtn: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  rightBtn: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 1,
    borderLeftColor: colors.blue1,
  },
});
