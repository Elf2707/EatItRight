// @flow
/* eslint-disable no-underscore-dangle */
import { action, observable, runInAction, flow } from 'mobx';
import firebase from 'react-native-firebase';
import { logger } from 'react-native-logger';

import { launchLoginPageApp, launchTabsApp } from '../routing/appLauncher';

export default class AuthStore {
  @observable loading: boolean = false;
  @observable errorMsg: string = '';
  @observable successMsg: string = '';
  @observable user: ?UserData = {
    email: '',
    refreshToken: '',
  };

  store: MainStoreData;

  constructor() {
    this.unsubscriber = firebase.auth()
      .onAuthStateChanged((user: FirebaseUserData) => {
        if (user) {
          runInAction(() => {
            this.user = {
              email: user._user.email,
              refreshToken: user._user.refreshToken,
            };
          });
          launchTabsApp();
        } else {
          launchLoginPageApp();
        }
      });
  }

  createUser = flow(function* createUser(email: string, password: string) {
    this.loading = true;

    try {
      const user = yield firebase.auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      this.user = {
        email: user._user.email,
        refreshToken: user._user.refreshToken,
      };
      this.successMsg = 'User was successfully created.';
    } catch (err) {
      this.errorMsg = err.userInfo.NSLocalizedDescription;
      logger.log(err);
    }

    this.loading = false;
  });

  login = flow(function* login(email: string, password: string) {
    this.loading = true;

    try {
      const { user } = yield firebase.auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password);
      this.user = {
        email: user._user.email,
        refreshToken: user._user.refreshToken,
      };
      launchTabsApp();
    } catch (err) {
      this.errorMsg = err.userInfo.NSLocalizedDescription;
      logger.log(err);
    }

    this.loading = false;
  });

  @action
  async logout() {
    this.loading = true;

    try {
      await firebase.auth().signOut();
    } catch (err) {
      logger.log(err);
    }

    this.loading = false;
  }

  forgotPassword = flow(function* forgotPassword(email: string) {
    this.loading = true;

    try {
      yield firebase.auth().sendPasswordResetEmail(email);
      this.successMsg = `Reset password link was send to ${email}`;
    } catch (err) {
      this.errorMsg = err.userInfo.NSLocalizedDescription;
      logger.log(err);
    }

    this.loading = false;
  });

  @action
  setErrorMsg(errorMsg: string) {
    this.errorMsg = errorMsg;
  }

  @action
  setSuccessMsg(successMsg: string) {
    this.successMsg = successMsg;
  }
}
