// @flow
import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

import colors from './colors'

type Props = {
  title: string,
}

export default function SimpleButton({ title }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainDark,
    width: 100,
    height: 45,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },

  text: {
    fontSize: 20,
    color: colors.white,
  },
})
