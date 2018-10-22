// @flow
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import Navigation from 'react-native-navigation';
import { logger } from 'react-native-logger';

const FIRST_INSTALL_TAG = 'first_install_tag';

export async function load(): Promise<?SettingsData> {
  try {
    const user = firebase.auth().currentUser;

    if (user && user._user) {
      const settingsDoc = await firebase.firestore()
        .collection('foodItems')
        .doc(user._user.uid)
        .get();

      return settingsDoc.data();
    }
  } catch (err) {
    logger.log(err);
  }

  return null;
}

export async function addFoodItem(foodItem: FoodItemData) {
  try {
    const user = firebase.auth().currentUser;

    if (user && user._user) {
      await firebase.firestore()
        .collection('foodItems')
        .doc(user._user.uid)
        .set(settings, { merge: true });
    }
  } catch (err) {
    logger.log(err);
  }
}


export async function initDbLoad() {
  try {
    const firstInstall = await AsyncStorage.getItem(FIRST_INSTALL_TAG);

    if (!firstInstall) {
      const user = firebase.auth().currentUser;
 
    }
  } catch (err) {
    logger.log(err);
  }
}
