// @flow
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../../colors';

type Props = {
  style?: Object,
  isSelected: boolean,
  isFuture: boolean,
  disabled: boolean,
  text: string,
  onPress: () => void,
};

export default class DateButton extends React.Component<Props> {
  shouldComponentUpdate(newProps: Props) {
    return this.props.isSelected !== newProps.isSelected;
  }

  render() {
    const { disabled, isFuture, isSelected, onPress, text } = this.props;
    const opacity = isFuture ? 0.5 : 1;

    return (
      <TouchableOpacity
        style={[
          isSelected ? styles.selectedDayBtn : styles.dayBtn,
          { opacity },
          this.props.style,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.dayText}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  dayBtn: {
    height: 38,
    width: 38,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
  },

  selectedDayBtn: {
    height: 38,
    width: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.mainDark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: colors.mainDark,
  },

  dayText: {
    width: 20,
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
});
