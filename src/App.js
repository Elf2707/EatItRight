// @flow
import { Navigation } from 'react-native-navigation';

import images from './common/assets/images';
import { colors } from './common/ui';
import registerScreens from './routing/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [{
                component: {
                  name: 'screens.DayFoodList',
                  options: {
                    topBar: {
                      visible: false,
                      title: {
                        text: 'За день',
                      },
                    },
                    bottomTab: {
                      text: 'Дневной список',
                      textColor: colors.mainDark,
                      iconColor: colors.mainDark,
                      selectedTextColor: colors.white,
                      selectedIconColor: colors.white,
                      icon: images.dayFoodIcon,
                      testID: 'DAY_FOOD_TAB_BAR_BUTTON',
                    },
                    bottomTabs: { backgroundColor: colors.main },
                    backButton: { color: colors.white },
                    buttonColor: colors.white,
                  },
                },
              }],
            },
          },
          {
            stack: {
              children: [{
                component: {
                  name: 'screens.FoodsList',
                  options: {
                    topBar: {
                      visible: true,
                      background: { color: colors.main },
                      title: {
                        text: 'Продукты',
                        fontSize: 20,
                        color: colors.white,
                      },
                      searchBar: true,
                      searchBarHiddenWhenScrolling: true,
                      backButton: { color: colors.white },
                      buttonColor: colors.white,
                    },
                    bottomTab: {
                      text: 'Продукты',
                      icon: images.foodsListIcon,
                      textColor: colors.mainDark,
                      iconColor: colors.mainDark,
                      selectedTextColor: colors.white,
                      selectedIconColor: colors.white,
                      testID: 'FOOD_LIST_TAB_BAR_BUTTON',
                    },
                    bottomTabs: { backgroundColor: colors.main },
                  },
                },
              }],
            },
          },
          {
            stack: {
              children: [{
                component: {
                  name: 'screens.Settings',
                  options: {
                    topBar: {
                      visible: true,
                      background: { color: colors.main },
                      title: {
                        text: 'Настройки',
                        fontSize: 20,
                        color: colors.white,
                      },
                      backButton: { color: colors.white },
                      buttonColor: colors.white,
                    },
                    bottomTab: {
                      text: 'Настройки',
                      icon: images.settingsIcon,
                      textColor: colors.mainDark,
                      iconColor: colors.mainDark,
                      selectedTextColor: colors.white,
                      selectedIconColor: colors.white,
                      testID: 'SETTINGS_TAB_BAR_BUTTON',
                    },
                    bottomTabs: { backgroundColor: colors.main },
                  },
                },
              }],
            },
          },
        ],
      },
    },
  });

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
