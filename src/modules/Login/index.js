// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, SvgMorphIcon } from '../../common/ui';
import { svgMorphs } from '../../common/assets/svgs';
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
        <SvgMorphIcon svgIcons={[svgMorphs.apple, svgMorphs.chickenLeg]} />
        <SvgMorphIcon svgIcons={[svgMorphs.fish, svgMorphs.hamburger]} />
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
