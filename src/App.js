// @flow
import { Navigation } from 'react-native-navigation';

import registerScreens from './routing/screens';

console.log('ttttttttttt----0000000');
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
