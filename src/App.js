// @flow
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'screens.MainCalendar',
      },
    },
  });
});
