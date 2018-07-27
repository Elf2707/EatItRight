// @flow
import { Navigation } from 'react-native-navigation';

import DayFoodList from '../modules/DayFoodList';

export default function registerScreens() {
  Navigation.registerComponent('screens.DayFoodList', () => DayFoodList);
}
