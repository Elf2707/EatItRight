// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Akira } from 'react-native-textinput-effects';

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
        <SvgMorphIcon svgIcons={[svgMorphs.apple, svgMorphs.chickenLeg]} />
        <SvgMorphIcon svgIcons={[svgMorphs.fish, svgMorphs.hamburger]} />
        <SvgMorphIcon svgIcons={[svgMorphs.cookies, svgMorphs.carrot]} />
        <SvgMorphIcon svgIcons={[svgMorphs.lollipop, svgMorphs.croissant]} />
        <SvgMorphIcon svgIcons={[svgMorphs.desert, svgMorphs.cake]} />

        <View style={styles.content}>
          <Akira
            style={styles.input}
            label="Email"
            borderColor={colors.blue1}
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
          />
          <Akira
            style={styles.input}
            label="Password"
            secureTextEntry
            borderColor={colors.blue1}
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={this.onLogin}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
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

  content: {
    width: '80%',
    maxWidth: 400,
  },

  input: {
    marginBottom: 8,
  },

  inputLabel: {
    color: colors.magenta1,
    fontSize: 16,
  },

  btn: {
    backgroundColor: colors.mainDark,
    width: 90,
    height: 45,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },

  btnText: {
    fontSize: 20,
    color: colors.white,
  },
});
