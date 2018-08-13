// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';

import { colors } from '../../../common/ui';

type Props = {
  style: ?Object,
  dayFoods: Array<DayFoodItemData>,
};

export default function Total({ style, dayFoods }: Props) {
  const initResults = {
    protein: 0,
    fat: 0,
    carb: 0,
  };

  const totalResults = dayFoods.reduce((results, item) => {
    const newResults = { ...results };
    newResults.protein += item.protein;
    newResults.fat += item.fat;
    newResults.carb += item.carbohydrate;

    return newResults;
  }, initResults);

  return (
    <TouchableHighlight
      style={styles.container}
      disabled={false}
    >
      <View style={[styles.content, style]}>
        <View style={styles.proteinCont}>
          <Text style={styles.paramText}>
            {`220/${_.round(totalResults.protein, 2)}`}
          </Text>
        </View>

        <View style={styles.fatCont}>
          <Text style={styles.paramText}>
            {`52.5/${_.round(totalResults.fat, 2)}`}
          </Text>
        </View>

        <View style={styles.carbCont}>
          <Text style={styles.paramText}>
            {`220/${_.round(totalResults.carb, 2)}`}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

Total.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
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

  proteinCont: {
    backgroundColor: colors.protein,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
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
    marginLeft: 24,
  },

  paramText: {
    fontSize: 16,
    color: colors.white,
  },
});
