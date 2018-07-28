// @flow
import React from 'react';
import { Provider } from 'mobx-react';
import { Navigation } from 'react-native-navigation';

import Store from '../store';
import DayFoodList from '../modules/DayFoodList';

const DayFoodListConnected = () => (
  <Provider {...Store}>
    <DayFoodList />
  </Provider>
);

console.log('ttttttttttt----0000000');
export default function registerScreens() {
  Navigation.registerComponent('screens.DayFoodList', () => DayFoodList);
}
