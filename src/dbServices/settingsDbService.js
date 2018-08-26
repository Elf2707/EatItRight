// @flow
import firebase from 'react-native-firebase';
import { logger } from 'react-native-logger';

export async function load(): Promise<?SettingsData> {
  try {
    const user = firebase.auth().currentUser;

    if (user && user._user) {
      const settings = await firebase.firestore()
        .collection('settings')
        .doc(user._user.uid)
        .get();

      return settings;
    }

    console.log('tttttttt --- kkdskfmklds');
    console.log(user);
  } catch (err) {
    logger.log(err);
  }

  return null;
}

export async function save(settings: SettingsData) {
  try {
    const user = firebase.auth().currentUser;

    if (user && user._user) {
      await firebase.firestore()
        .collection('settings')
        .doc(user._user.uid)
        .set(settings, { merge: true });
    }
  } catch (err) {
    logger.log(err);
  }
}
