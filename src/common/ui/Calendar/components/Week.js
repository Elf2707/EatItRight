// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import DateButton from './DateButton';

type Props = {
  style?: Object,
  weekDays: Array<moment>,
  selectedDate: moment,
  onDayPress: (date: Date) => void,
};

export default class Week extends React.Component<Props> {
  onDayPress = (dayDate: moment) => {
    requestAnimationFrame(() => {
      const { onDayPress } = this.props;
      if (onDayPress) {
        onDayPress(dayDate.toDate());
      }
    });
  };

  render() {
    const { style, weekDays, selectedDate } = this.props;

    return (
      <View style={[styles.container, style]}>
        {weekDays.map((date) => {
          const isFuture = moment().isBefore(date, 'day');
          const isSelected = selectedDate.isSame(date, 'day');

          return (
            <DateButton
              isFuture={isFuture}
              isSelected={isSelected}
              onPress={() => this.onDayPress(date)}
              text={date.format('D')}
              key={date.format('YYYY-MM-DD')}
              disabled={isFuture}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 38,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
