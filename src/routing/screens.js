// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';
import { Navigation } from 'react-native-navigation';

import Store from '../store';
import DayFoodList from '../modules/DayFoodList';
import FoodsList from '../modules/FoodsList';
import EditFoodItem from '../modules/EditFoodItem';

function providerHOC(WrappedComponent: React.ComponentType<*>) {
  const ResultComponent = (props: any) => (
    <Provider {...Store}>
      <WrappedComponent {...props} />
    </Provider>
  );

  ResultComponent.displayName = getDisplayName(WrappedComponent);

  return ResultComponent;
}

function getDisplayName(WrappedComponent) {
  return `providerHOC(${WrappedComponent.displayName})`
    || `providerHOC(${WrappedComponent.name})` || 'providerHOC(Component)';
}

export default function registerScreens() {
  Navigation.registerComponent('screens.DayFoodList',
    () => providerHOC(DayFoodList));
  Navigation.registerComponent('screens.FoodsList',
    () => providerHOC(FoodsList));
  Navigation.registerComponent('screens.EditFoodItem',
    () => providerHOC(EditFoodItem));
}
