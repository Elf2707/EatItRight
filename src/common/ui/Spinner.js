// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';

import colors from './colors';

type Props = {
  style?: ?Object,
  color?: string,
  size: 'large' | 'small';
};

export default function Spinner(props: Props) {
  return (
    <ActivityIndicator
      style={props.style}
      size={props.size}
      color={props.color}
    />
  );
}

Spinner.defaultProps = {
  style: null,
  color: colors.mainDark,
  size: 'large',
};
