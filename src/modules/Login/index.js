// @flow
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Keyboard,
} from 'react-native';
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

  onCreateUser = () => {

  };

  renderButtons() {
    return (
      <View style={styles.btnsCont}>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={this.onLogin}
        >
          <Text style={styles.btnSignUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={this.onLogin}
        >
          <Text style={styles.btnSignInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
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
            selectionColor={colors.mainDark}
          />
          <Akira
            style={styles.input}
            label="Password"
            secureTextEntry
            borderColor={colors.blue1}
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
            selectionColor={colors.mainDark}
          />

          {this.renderButtons()}
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
    color: colors.mainDark,
    fontSize: 16,
  },

  btnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnSignIn: {
    backgroundColor: colors.mainDark,
    width: 90,
    height: 45,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },

  btnSignInText: {
    fontSize: 20,
    color: colors.white,
  },

  btnSignUp: {
    borderColor: colors.mainDark,
    borderWidth: 2,
    width: 90,
    height: 45,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
    marginRight: 24,
  },

  btnSignUpText: {
    fontSize: 20,
    color: colors.mainDark,
  },
});
