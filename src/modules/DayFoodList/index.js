// @flow
import React from 'react';
import {
  Animated, ActivityIndicator, StyleSheet, View, Text, ScrollView,
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
  isScrollOn: boolean,
  currentDay: Date,
};

export default class DayFoodList extends React.Component<Props, State> {
  scrollView: Interactable;

  state = {
    animValue: new Animated.Value(400),
    calendarHeight: 400,
    isLayoutDone: false,
    isScrollOn: false,
    currentDay: new Date(),
  };

  componentDidMount() {
    this.scrollView.scrollTo({
      x: 0,
      y: (this.state.calendarHeight * MIN_HEADER_SCALE) - 40,
      animated: false,
    });

    this.props.foodsStore.getAllFoods();
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

  onSnap = ({ nativeEvent }: OnSnapEvent) => {
    if (nativeEvent.index === 0) {
      this.setState({ isScrollOn: false });
    } else if (nativeEvent.index === 1) {
      this.setState({ isScrollOn: true });
    }
  };

  onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: this.state.animValue } } }]);

  renderShortHeader() {
    const { animValue, calendarHeight, currentDay } = this.state;

    const opacity = animValue.interpolate({
      inputRange: [0, calendarHeight * MIN_HEADER_SCALE],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const translateY = animValue.interpolate({
      inputRange: [0, calendarHeight],
      outputRange: [10, 2],
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

    const opacity = animValue.interpolate({
      inputRange: [-calendarHeight * MIN_HEADER_SCALE, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{ opacity }}
        onLayout={this.onLayout}
      >
        <Calendar onDayPress={this.onDayChange} />
      </Animated.View>
    );
  }

  render() {
    const { animValue, calendarHeight, isScrollOn } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.content}
          ref={r => this.scrollView = r}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {this.renderCalendar()}
          {

          }
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
        </ScrollView>

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
    backgroundColor: colors.main,
  },

  shortHeaderCont: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
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
    backgroundColor: colors.white,
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
