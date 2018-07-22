// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {

};

export default class MainCalendar extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!!!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellowgreen'
  },
});
