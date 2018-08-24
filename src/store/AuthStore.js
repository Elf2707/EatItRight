// @flow
/* eslint-disable no-underscore-dangle */
import {
  action, observable, computed, runInAction, extendObservable, flow,
} from 'mobx';
import firebase from 'react-native-firebase';
import { logger } from 'react-native-logger';
import _ from 'lodash';

export default class AuthStore {
  @observable loading: boolean = false;
  @observable error: string = '';
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
        }
      });
  }

  @action
  createUser = flow(function* createUser(email: string, password: string) {
    try {
      const user = yield firebase.auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      this.user = {
        email: user._user.email,
        refreshToken: user._user.refreshToken,
      };
    } catch (err) {
      this.error = err.userInfo.NSLocalizedDescription;
      logger.log(err);
    }
  });

  @action
  login(email: string, password: string) {

  }

  @action
  logout() {

  }

  @action
  forgotPassword = flow(function* forgotPassword(email: string) {

  });

  @action
  setError(errorMsg: string) {
    this.error = errorMsg;
  }
}
