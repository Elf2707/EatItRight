// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import { colors } from '../../../common/ui';

type Props = {
  item: DayFoodItemData,
};

export default class DayFoodItem extends React.Component<Props> {
  onDeleteItem = () => {
    console.log('on delete item ---  0000');
  }

  render() {
    const { item } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.timeText}>
          {moment(item.added_at).format('HH:mm')}
        </Text>
        <View style={styles.itemInfoCont}>
          <Text
            style={styles.nameText}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <View style={styles.itemParamsCont}>
            <Text style={styles.itemParamsText}>
              <Text style={styles.itemParamsHeaderText}>P: </Text>
              {item.protein}
            </Text>
            <Text style={styles.itemParamsText}>
              <Text style={styles.itemParamsHeaderText}>F: </Text>
              {item.fat}
            </Text>
            <Text style={styles.itemParamsText}>
              <Text style={styles.itemParamsHeaderText}>C: </Text>
              {item.carbohydrate}
            </Text>
          </View>
        </View>
        <Text style={styles.weightText}>
          {item.weight}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },

  timeText: {
    textAlign: 'center',
    color: colors.subText1,
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemInfoCont: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  nameText: {
    flex: 1,
    fontSize: 18,
    color: colors.mainText,
  },

  itemParamsCont: {
    flex: 1,
    flexDirection: 'row',
  },

  itemParamsText: {
    fontSize: 16,
    color: colors.mainText,
    marginRight: 20,
  },

  itemParamsHeaderText: {
    fontSize: 16,
    color: colors.subText,
  },

  weightText: {
    fontSize: 18,
    color: colors.mainText,
  },
});
