// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from './colors';

type Props = {
  style: ?Object,
  text: string,
  backgroundColor: string,
};

export default function FoodIngredient({
  style,
  text,
  backgroundColor,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

FoodIngredient.defaultProps = { style: null };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    color: colors.white,
  },
});
