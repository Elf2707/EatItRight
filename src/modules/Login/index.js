// @flow
import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Keyboard,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Akira } from 'react-native-textinput-effects';
import firebase from 'react-native-firebase';

import {
  colors, SvgMorphIcon, ErrorMsgView, SuccessMsgView, Spinner,
} from '../../common/ui';
import { svgMorphs } from '../../common/assets/svgs';
import { launchTabsApp } from '../../routing/appLauncher';

const EMAIL_VALIDATION = /.+@.+\..+/i;

type Props = {
  authStore: AuthStoreData
};

type State = {
  email: string,
  password: string,
};

@inject('authStore')
@observer
export default class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
  };

  onLogin = () => {
    const { authStore } = this.props;
    const { email, password } = this.state;

    if (!EMAIL_VALIDATION.test(email)) {
      authStore.setErrorMsg('Enter valid email address!');
      return;
    }

    if (password.length < 6) {
      authStore.setErrorMsg('Wrong password!');
      return;
    }

    authStore.login(email, password);
  };

  onCreateUser = async () => {
    const { authStore } = this.props;
    const { email, password } = this.state;

    if (!EMAIL_VALIDATION.test(email)) {
      authStore.setErrorMsg('Enter valid email address!');
      return;
    }

    if (password.length < 6) {
      authStore.setErrorMsg('Password should be not less then 6 symbols');
      return;
    }

    authStore.createUser(email, password);
  };

  onForgotPassword = () => {
    const { authStore } = this.props;
    const { email } = this.state;

    if (!EMAIL_VALIDATION.test(email)) {
      authStore.setErrorMsg('Enter valid email address!');
      return;
    }

    authStore.forgotPassword(email);
  };

  renderForgotPasswordBtn = () => (
    <TouchableOpacity
      style={styles.btnForgot}
      onPress={this.onForgotPassword}
    >
      <Text style={styles.btnForgotText}>Forgot Password?</Text>
    </TouchableOpacity>
  );

  renderButtons() {
    return (
      <View style={styles.btnsCont}>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={this.onCreateUser}
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

  renderMessages() {
    const { authStore } = this.props;

    return (
      <>
        {authStore.errorMsg !== '' && (
          <ErrorMsgView
            style={styles.feedbackMsgCont}
            message={authStore.errorMsg}
            onClose={() => authStore.setErrorMsg('')}
          />
        )}

        {authStore.successMsg !== '' && (
          <SuccessMsgView
            style={styles.feedbackMsgCont}
            message={authStore.successMsg}
            onClose={() => authStore.setSuccessMsg('')}
          />
        )}
      </>
    );
  }

  render() {
    const { authStore } = this.props;

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

        {this.renderForgotPasswordBtn()}
        <View style={styles.content}>
          <Akira
            style={styles.input}
            label="Email"
            borderColor={colors.blue1}
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
            selectionColor={colors.mainDark}
            onChangeText={email => this.setState({ email })}
          />
          <Akira
            style={styles.input}
            label="Password"
            secureTextEntry
            borderColor={colors.blue1}
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
            selectionColor={colors.mainDark}
            onChangeText={password => this.setState({ password })}
          />

          {this.renderButtons()}
        </View>

        {authStore.loading && <Spinner style={styles.spinner} />}
        {this.renderMessages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
    width: 100,
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
    width: 100,
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

  feedbackMsgCont: {
    top: '20%',
  },

  btnForgot: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  btnForgotText: {
    fontSize: 16,
    color: colors.mainDark,
    textDecorationLine: 'underline',
  },

  spinner: {
    position: 'absolute',
    top: '20%',
  },
});
