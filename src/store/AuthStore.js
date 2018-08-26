// @flow
/* eslint-disable no-underscore-dangle */
import { action, observable, runInAction, flow } from 'mobx';
import firebase from 'react-native-firebase';
import { logger } from 'react-native-logger';

import { launchLoginPageApp, launchTabsApp } from '../routing/appLauncher';
import { settingsDbService } from '../dbServices';

export default class AuthStore {
  @observable loading: boolean = false;
  @observable errorMsg: string = '';
  @observable successMsg: string = '';
  @observable user: ?UserData = {
    email: '',
    uid: '',
  };

  store: MainStoreData;

  constructor(store: MainStoreData) {
    this.store = store;

    this.unsubscriber = firebase.auth()
      .onAuthStateChanged((user: FirebaseUserData) => {
        if (user) {
          runInAction(() => {
            this.user = {
              uid: user._user.uid,
              email: user._user.email,
            };
          });

          this.store.settingsStore.setSettings(settingsDbService.load());
          launchTabsApp();
        } else {
          launchLoginPageApp();
        }
      });
  }

  createUser = flow(function* createUser(email: string, password: string) {
    this.loading = true;

    try {
      const { user } = yield firebase.auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      this.user = {
        uid: user._user.uid,
        email: user._user.email,
      };

      this.successMsg = 'User was successfully created.';
      this.saveUser(this.user);
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

  async saveUser(user: FirebaseUserData) {
    try {
      await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .set(user);
    } catch (err) {
      logger.log(err);
    }
  }
}
