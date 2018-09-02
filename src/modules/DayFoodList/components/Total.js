// @flow
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';

import { colors, ExStyleSheet } from '../../../common/ui';

type Props = {
  style: ?Object,
  dayFoods: Array<DayFoodItemData>,
  proteinsLimit: number,
  fatsLimit: number,
  carbsLimit: number,
  caloriesLimit: number,
};

export default function Total({
  style,
  dayFoods,
  proteinsLimit,
  fatsLimit,
  carbsLimit,
  caloriesLimit,
}: Props) {
  const initResults = {
    proteins: 0,
    fats: 0,
    carbs: 0,
  };

  const totalResults = dayFoods.reduce((results, item) => {
    const newResults = { ...results };
    newResults.proteins += item.protein;
    newResults.fats += item.fat;
    newResults.carbs += item.carbohydrate;

    return newResults;
  }, initResults);
  const calories = (totalResults.proteins * 4)
    + (totalResults.fats * 9) + (totalResults.carbs * 4);

  const isCalReached = calories >= caloriesLimit;
  const isProteinsReached = totalResults.proteins >= proteinsLimit;
  const isFatsReached = totalResults.fats >= fatsLimit;
  const isCarbsReached = totalResults.carbs >= carbsLimit;

  return (
    <TouchableHighlight
      style={styles.container}
      disabled={false}
    >
      <View style={[styles.content, style]}>
        <View style={styles.caloriesCont}>
          <Text
            style={[
              styles.caloriesText,
              { color: isCalReached ? colors.red : colors.mainText },
            ]}
          >
            {`${caloriesLimit}/${_.round(calories)}`}
          </Text>
        </View>

        <View style={styles.proteinCont}>
          <Text
            style={[
              styles.paramText,
              { color: isProteinsReached ? colors.protein : colors.white },
            ]}
          >
            {`${proteinsLimit}/${_.round(totalResults.proteins, 2)}`}
          </Text>
        </View>

        <View style={styles.fatCont}>
          <Text
            style={[
              styles.paramText,
              { color: isFatsReached ? colors.red : colors.white },
            ]}
          >
            {`${fatsLimit}/${_.round(totalResults.fats, 2)}`}
          </Text>
        </View>

        <View style={styles.carbCont}>
          <Text
            style={[
              styles.paramText,
              { color: isCarbsReached ? colors.red : colors.white },
            ]}
          >
            {`${carbsLimit}/${_.round(totalResults.carbs, 2)}`}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

Total.defaultProps = {
  style: null,
};

const styles = ExStyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    width: '100%',
    height: 60,
    backgroundColor: colors.transparent,
  },

  content: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  caloriesCont: {
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  proteinCont: {
    backgroundColor: colors.protein,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  fatCont: {
    backgroundColor: colors.fat,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },

  carbCont: {
    backgroundColor: colors.carbohydrate,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
    marginLeft: 12,
  },

  paramText: {
    fontSize: 14,
    color: colors.white,
    '@media (max-width: 320)': {
      fontSize: 12,
    },
  },

  caloriesText: {
    fontSize: 14,
    color: colors.mainText,
    '@media (max-width: 320)': {
      fontSize: 12,
    },
  },
});
