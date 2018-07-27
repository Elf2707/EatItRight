// @flow
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function sameMonth(a: Date, b: Date): boolean {
  return a instanceof Date && b instanceof Date
    && moment(a).isSame(b, 'month');
}

export function sameDate(a: Date, b: Date): boolean {
  return a instanceof Date && b instanceof Date
    && moment(a).isSame(b, 'day');
}

export function isAfterOrSame(a: Date, b: Date): boolean {
  return a instanceof Date && b instanceof Date
    && moment(a).isSameOrAfter(b, 'day');
}

export function isBeforeOrSame(a: Date, b: Date): boolean {
  return a instanceof Date && b instanceof Date
    && moment(a).isSameOrBefore(b, 'day');
}

export function daysFromTo(a: Date, b: Date): Array<Date> {
  if (!(a instanceof Date) || !(b instanceof Date)) {
    return [];
  }

  return Array.from(moment.range(moment(a), moment(b)).by('days'));
}

export function month(date: Date): Array<Date> {
  const start = moment(date).startOf('month');
  const end = moment(date).endOf('month');

  return Array.from(moment.range(moment(start), moment(end)).by('days'));
}

export function weekDayNames(firstDayOfWeek: number = 1): Array<string> {
  const dayShift = firstDayOfWeek % 7;
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return dayShift === 0
    ? dayNames : dayNames.slice(dayShift).concat(dayNames.slice(0, dayShift));
}

// eslint-disable-next-line max-statements
export function page(
  monthDate: Date,
  firstDayOfWeek: number = 1,
): Array<Date> {
  const monthStartDate = moment(monthDate).startOf('month');
  const monthEndDate = moment(monthDate).endOf('month');

  if (monthStartDate.weekday() < firstDayOfWeek) {
    monthStartDate.subtract(6, 'day');
  } else if (monthStartDate.weekday() > firstDayOfWeek) {
    monthStartDate.subtract(monthStartDate.weekday() - firstDayOfWeek, 'day');
  }

  if (((monthEndDate.weekday() + 1) % 7) !== firstDayOfWeek) {
    monthEndDate.add(7 - monthEndDate.weekday(), 'day');
  }

  return Array.from(moment.range(monthStartDate, monthEndDate).by('days'));
}
