// @flow
import React from 'react';
import {
  Animated, ActivityIndicator, StyleSheet, View, Text,
} from 'react-native';
import Interactable from 'react-native-interactable';
import moment from 'moment';

import { colors, Calendar } from '../../common/ui';

const MIN_HEADER_SCALE = 0.85;
type Props = {
  navigator: Navigator,
}

type State = {
  animValue: Animated.Value,
  calendarHeight: number,
  isLayoutDone: boolean,
  currentDay: Date,
};

export default class DayFoodList extends React.Component<Props, State> {
  interactableView: Interactable;

  state = {
    animValue: new Animated.Value(0),
    calendarHeight: 400,
    isLayoutDone: false,
    currentDay: new Date(),
  };

  componentDidMount() {
    this.interactableView.snapTo({ index: 1 });
  }

  onDayChange = (day: Date) => this.setState({ currentDay: day });

  onLayout = ({ nativeEvent }: OnLayoutEvent) => {
    if (!this.state.isLayoutDone) {
      this.setState({
        calendarHeight: nativeEvent.layout.height,
        isLayoutDone: true,
      });
    }
  };

  renderShortHeader() {
    const { animValue, calendarHeight, currentDay } = this.state;

    const opacity = animValue.interpolate({
      inputRange: [-calendarHeight * MIN_HEADER_SCALE, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const translateY = animValue.interpolate({
      inputRange: [-calendarHeight, 0],
      outputRange: [0, 20],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.shortHeaderCont, {
            opacity,
            translateY,
            height: (calendarHeight * (1 - MIN_HEADER_SCALE)) + 20,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.shortHeaderText,
            { transform: [{ translateY }] },
          ]}
        >
          {moment(currentDay).format('DD MMMM YYYY')}
        </Animated.Text>
      </Animated.View>
    );
  }

  renderCalendar() {
    const { animValue, calendarHeight } = this.state;

    const translateY = animValue.interpolate({
      inputRange: [-calendarHeight, 0],
      outputRange: [-calendarHeight, 0],
      extrapolate: 'clamp',
    });

    const opacity = animValue.interpolate({
      inputRange: [-calendarHeight * MIN_HEADER_SCALE, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={{ opacity, transform: [{ translateY }] }}
      >
        <Calendar onDayPress={this.onDayChange} />
      </Animated.View>
    );
  }

  render() {
    const { animValue, calendarHeight } = this.state;

    return (
      <View style={styles.container}>
        {this.renderCalendar()}

        <Interactable.View
          ref={r => this.interactableView = r}
          verticalOnly
          snapPoints={[{ y: 0 }, { y: -calendarHeight * MIN_HEADER_SCALE }]}
          boundaries={{ top: -calendarHeight }}
          animatedValueY={animValue}
        >
          <View style={styles.content}>
            <Row hour='09:00' text='Reminder Only: UX' />
            <Row hour='10:20' text='Mobile Guild Core - Daily' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
            <Row hour='18:00' text='Mobile Happy Thursday!' />
          </View>
        </Interactable.View>

        {this.renderShortHeader()}
      </View>
    );
  }
}

class Row extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.hour}>{this.props.hour}</Text>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.main,
  },

  content: {
    backgroundColor: 'white'
  },

  stylesCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shortHeaderCont: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  shortHeaderText: {
    fontSize: 20,
    color: colors.white,
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    height: 80,
    alignItems: 'center'
  },

  hour: {
    width: 80,
    textAlign: 'center',
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: 'bold'
  },

  text: {
    flex: 1,
    fontSize: 24,
  },
});
