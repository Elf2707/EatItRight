// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { colors } from '../index';
import { dateHelper } from '../../helpers';
import CalendarHeader from './components/CalendarHeader';
import Week from './components/Week';

type Props = {
  style?: Object,
  selectedDate: Date,
  firstDayOfWeek?: number,
  hideDayNames?: boolean,
  hideArrows: boolean,
  onDayPress: (day: Date) => void,
  onMonthChange?: (currentDate: ?Date) => void,
  renderArrow?: (direction: 'left' | 'right') => any,
};

type State = {
  monthDate: moment,
};

export default class Calendar extends React.Component<Props, State> {
  static defaultProps = {
    firstDayOfWeek: 0,
    hideDayNames: false,
    hideArrows: false,
  };

  state = {
    monthDate: moment(this.props.selectedDate),
  };

  changeMonth = (count: number) => {
    this.setState((state) => {
      const newDate = state.monthDate.clone()
        .add(count, 'months');

      const { onMonthChange } = this.props;
      if (onMonthChange) {
        onMonthChange(newDate.toDate());
      }

      return { monthDate: newDate };
    });
  }

  render() {
    const {
      style, hideArrows, firstDayOfWeek, renderArrow, hideDayNames, onDayPress,
      selectedDate,
    } = this.props;
    const { monthDate } = this.state;
    const days = _.chunk(dateHelper.page(monthDate), 7);

    return (
      <View style={[styles.container, style]}>
        <CalendarHeader
          hideArrows={hideArrows}
          month={this.state.monthDate}
          changeMonth={this.changeMonth}
          firstDayOfWeek={firstDayOfWeek}
          renderArrow={renderArrow}
          hideDayNames={hideDayNames}
        />

        {days.map(weekDays => (
          <Week
            weekDays={weekDays}
            selectedDate={moment(selectedDate)}
            onDayPress={onDayPress}
            key={`${Math.random() * 10000000}`}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.main,
  },
});
