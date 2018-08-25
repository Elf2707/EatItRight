// @flow
import { Navigation } from 'react-native-navigation';

import { colors } from './common/ui';
import registerScreens from './routing/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      drawBehind: false,
      background: { color: colors.main },
      title: {
        fontSize: 20,
        color: colors.white,
      },
      backButton: { color: colors.white },
      buttonColor: colors.white,
    },
    bottomTabs: { backgroundColor: colors.main },
  });
});
