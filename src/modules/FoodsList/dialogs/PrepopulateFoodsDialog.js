// @flow
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { colors, SimpleButton } from '../../../common/ui'

type Props = {}

export default class PrepopulateFoodsDb extends React.Component<Props> {
  onClose = () => {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Загрузить в базу данные для обычных блюд и продуктов русской кухни?
          </Text>

          <SimpleButton title="Load" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackOp40,
  },

  content: {
    width: '85%',
    maxWidth: 350,
    height: 250,
    padding: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.mainText,
    fontSize: 18,
    textAlign: 'center',
  },
})
