// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';
import { Navigation } from 'react-native-navigation';

import Store from '../store';
import DayFoodList from '../modules/DayFoodList';
import FoodsList from '../modules/FoodsList';
import EditFoodItem from '../modules/EditFoodItem';
import Settings from '../modules/Settings';
import Login from '../modules/Login';
import PrepopulateFoodsDialog
  from '../modules/FoodsList/dialogs/PrepopulateFoodsDialog';

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
  if (WrappedComponent.displayName && WrappedComponent.displayName !== '') {
    return `providerHOC(${WrappedComponent.displayName})`;
  }

  if (WrappedComponent.name && WrappedComponent.name !== '') {
    return `providerHOC(${WrappedComponent.name})`;
  }

  return 'providerHOC(Component)';
}

export default function registerScreens() {
  Navigation.registerComponent('screens.DayFoodList',
    () => providerHOC(DayFoodList));
  Navigation.registerComponent('screens.FoodsList',
    () => providerHOC(FoodsList));
  Navigation.registerComponent('screens.EditFoodItem',
    () => providerHOC(EditFoodItem));
  Navigation.registerComponent('screens.Settings',
    () => providerHOC(Settings));
  Navigation.registerComponent('screens.Login',
    () => providerHOC(Login));

  // Dialogs  
  Navigation.registerComponent('dialogs.PrepopulateFoods',
    () => providerHOC(PrepopulateFoodsDialog));
}
