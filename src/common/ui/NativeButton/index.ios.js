// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';

import colors from '../colors';

type Props = {
  style: Array<any> | Object;
  children: Array<any> | Object;
  onPress: () => void;
  disabled: boolean;
  disabledOpacity?: number;
};

export default function NativeButton({
  onPress,
  children,
  style,
  disabled,
  disabledOpacity,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[style, { opacity: disabled ? disabledOpacity : 1 }]}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

// eslint-disable-next-line immutable/no-mutation
NativeButton.defaultProps = {
  disabled: false,
  disabledOpacity: 1,
};
