// @flow
import { Navigation } from 'react-native-navigation';

import registerScreens from './routing/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'screens.DayFoodList',
      },
    },
  });
});
