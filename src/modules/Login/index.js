// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors } from '../../common/ui';
import { launchTabsApp } from '../../routing/appLauncher';

type Props = {

};

export default class Login extends React.Component<Props> {
  onLogin = () => {
    launchTabsApp();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.onLogin}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
