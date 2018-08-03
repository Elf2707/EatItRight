// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { colors } from '../index';
import { dateHelper } from '../../helpers';
import CalendarHeader from './components/CalendarHeader';

type Props = {
  style?: Object,
  currentDate?: Date,
  firstDayOfWeek?: number,
  hideDayNames?: boolean,
  hideArrows: boolean,
  onDayPress?: (day: Date) => void,
  onMonthChange?: (currentDate: ?Date) => void,
  renderArrow?: (direction: 'left' | 'right') => any,
};

type State = {
  monthDate: moment,
  selectedDate: moment,
};

export default class Calendar extends React.Component<Props, State> {
  static defaultProps = {
    currentDate: moment(),
    firstDayOfWeek: 0,
    hideDayNames: false,
    hideArrows: false,
  };

  constructor(props: Props) {
    super(props);

    // eslint-disable-next-line immutable/no-mutation
    this.state = {
      monthDate: moment(props.currentDate),
      selectedDate: moment(props.currentDate),
    };
  }

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

  onDayPress = (dayDate: moment) => {
    this.setState({ selectedDate: dayDate }, () => {
      const { onDayPress } = this.props;
      if (onDayPress) {
        onDayPress(dayDate.toDate());
      }
    });
  }

  renderCalendar() {
    const { monthDate, selectedDate } = this.state;
    const days = _.chunk(dateHelper.page(monthDate), 7);

    return days.map(weekDays => (
      <View
        style={styles.weekContInDayMode}
        key={`${Math.random() * 10000000}`}
      >
        {weekDays.map((date) => {
          const isFuture = moment().isBefore(date, 'day');
          const isSelected = selectedDate.isSame(date, 'day');
          const opacity = isFuture ? 0.5 : 1;

          return (
            <TouchableOpacity
              style={[
                isSelected ? styles.selectedDayBtn : styles.dayBtn,
                { opacity },
              ]}
              onPress={() => this.onDayPress(date)}
              key={date}
              disabled={moment().isBefore(date, 'day')}
            >
              <Text style={styles.dayText}>
                {date.format('D')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  }

  render() {
    const {
      style, hideArrows, firstDayOfWeek, renderArrow, hideDayNames,
    } = this.props;

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

        {this.renderCalendar()}
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

  weekContInDayMode: {
    flexDirection: 'row',
    height: 38,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dayText: {
    width: 20,
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },

  dayBtn: {
    height: 38,
    width: 38,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
  },

  selectedDayBtn: {
    height: 38,
    width: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.mainDark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: colors.mainDark,
  },
});
