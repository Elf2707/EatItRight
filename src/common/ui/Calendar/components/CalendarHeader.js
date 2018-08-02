// @flow
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

import { NativeButton, colors } from '../../index';
import images from '../../../assets/images';
import { dateHelper } from '../../../helpers';

type Props = {
  style?: Object;
  month: moment;
  changeMonth: (monthsCount: number) => void;
  renderArrow?: (direction: 'left' | 'right') => any;
  firstDayOfWeek?: number;
  hideDayNames: boolean;
  hideArrows: boolean;
};

export default class CalendarHeader extends React.Component<Props> {
  static defaultProps = {
    hideArrows: false,
    hideDayNames: false,
    firstDayOfWeek: 1,
  };

  subtractMonth = () => this.props.changeMonth(-1);
  addMonth = () => this.props.changeMonth(1);

  leftArrow = () => (
    <NativeButton
      style={styles.arrowBtn}
      onPress={this.subtractMonth}
      borderless
      rippleColor={colors.whiteB3Op}
    >
      {this.props.renderArrow
        ? this.props.renderArrow('left')
        : (
          <Image
            style={styles.arrowIcon}
            source={images.arrowLeftIcon}
            resizeMode="contain"
          />
        )}
    </NativeButton>
  );

  rightArrow = () => (
    <NativeButton
      style={styles.arrowBtn}
      onPress={this.addMonth}
      borderless
      rippleColor={colors.whiteB3Op}
      disabled={this.props.month.isSame(new Date(), 'month')}
      disabledOpacity={0.5}
    >
      {this.props.renderArrow
        ? this.props.renderArrow('right')
        : (
          <Image
            style={styles.arrowIcon}
            source={images.arrowRightIcon}
            resizeMode="contain"
          />
        )}
    </NativeButton>
  );

  render() {
    const {
      firstDayOfWeek, style, hideArrows, month, hideDayNames,
    } = this.props;
    const weekDaysNames = dateHelper.weekDayNames(firstDayOfWeek);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.dateTitleCont}>
          {!hideArrows ? this.leftArrow() : <View />}

          <Text style={styles.dateTitleText}>
            {moment(month).format('MMMM YYYY')}
          </Text>

          {!hideArrows ? this.rightArrow() : <View />}
        </View>

        {!hideDayNames && (
          <View style={styles.dayNamesCont}>
            {weekDaysNames.map(day => (
              <Text
                key={`${Math.random() * 10000000}`}
                style={styles.dayNameText}
                numberOfLines={1}
              >
                {day.charAt(0)}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },

  dateTitleCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dateTitleText: {
    fontSize: 20,
    color: colors.white,
  },

  arrowBtn: {
    width: 40,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowIcon: {
    width: 25,
    height: 25,
  },

  dayNamesCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 8,
  },

  dayNameText: {
    fontSize: 16,
    color: colors.white,
    width: 20,
    textAlign: 'center',
  },
});
