// @flow
import {
  action, observable, computed, runInAction, extendObservable,
} from 'mobx';
import firebase from 'react-native-firebase';
import { logger } from 'react-native-logger';
import _ from 'lodash';

export default class AuthStore {
  @observable loading: boolean = false;
  @observable error: string = '';
  @observable user: ?UserData = null;

  store: MainStoreData;

  constructor() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      console.log('tttttttttttttt --- 000');
      console.log(user);
      console.log('tttttttttttttt --- 111');
      if (user) {
        runInAction(() => extendObservable(this.user, user));
      }
    });
  }

  @action
  async createUser(email: string, password: string) {
    try {
      const user = await firebase.auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      console.log('ttttttttttttttt -- 000');
      console.log(user);
      console.log('ttttttttttttttt -- 111');
    } catch (err) {
      console.log('ttttttttttttttt -- 000err');
      console.log(err.userInfo.NSLocalizedDescription);
      console.log('ttttttttttttttt -- 111err');
      //logger.log(err);
    }
  }

  @action
  login(email: string, password: string) {

  }

  @action
  logout() {

  }
}
