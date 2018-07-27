// @flow
// FIXME: remove once other fixme is fixed
/* eslint-disable no-unused-vars */
import React from 'react';
import { TouchableNativeFeedback, View, Platform } from 'react-native';

import colors from './colors';

type Props = {
  style: Array<any> | Object;
  children: Array<any> | Object;
  onPress: () => void;
  borderless?: boolean;
  rippleColor?: string;
  disabled: boolean;
  disabledOpacity?: number;
};

export default function NativeButton({
  onPress,
  borderless,
  rippleColor,
  children,
  style,
  disabled,
  disabledOpacity,
}: Props) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      disabled={disabled}
      background={chooseBackgroundColor(rippleColor, borderless)}
    >
      <View style={[style, { opacity: disabled ? disabledOpacity : 1 }]}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
}

const chooseBackgroundColor = (rippleColor, borderless) => {
  if (Platform.Version > 20) {
    return TouchableNativeFeedback.Ripple(rippleColor, borderless);
  }
  return TouchableNativeFeedback.SelectableBackground();
};

// eslint-disable-next-line immutable/no-mutation
NativeButton.defaultProps = {
  borderless: false,
  rippleColor: colors.rippleDefault,
  disabled: false,
  disabledOpacity: 1,
};
