// @flow
import { Navigation } from 'react-native-navigation';

import MainCalendar from '../modules/MainCalendar';

export default function registerScreens() {
  Navigation.registerComponent('screens.MainCalendar', () => MainCalendar);
}
