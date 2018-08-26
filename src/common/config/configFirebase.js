// @flow
import firebase from 'react-native-firebase';

const db = firebase.firestore();
db.settings.areTimestampsInSnapshotsEnabled = true;
