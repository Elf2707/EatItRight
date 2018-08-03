// @flow
import React from 'react';
import {
  Animated, StyleSheet, View, ScrollView, Dimensions,
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Interactable from 'react-native-interactable';
import moment from 'moment';

import { colors, Calendar } from '../../common/ui';
import DayFoodItem from './components/DayFoodItem';
import Total from './components/Total';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const MIN_HEADER_SCALE = 0.85;
const MIN_HEADER_H = 110;

type Props = {
  foodsStore: FoodsStoreData,
  navigator: Navigator,
}

type State = {
  animValue: Animated.Value,
  calendarHeight: number,
  isLayoutDone: boolean,
  currentDay: Date,
};

@inject('foodsStore')
@observer
export default class DayFoodList extends React.Component<Props, State> {
  static get options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
    };
  }

  scrollView: Interactable;

  state = {
    animValue: new Animated.Value(400),
    calendarHeight: 400,
    isLayoutDone: false,
    currentDay: new Date(),
  };

  componentDidMount() {
    this.scrollView.scrollTo({
      x: 0,
      y: (this.state.calendarHeight - MIN_HEADER_H) - 65,
      animated: false,
    });

    this.props.foodsStore.getDayFoods();
  }

  componentWillUnmount() {
    this.state.animValue.removeAllListeners();
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

  onScroll = Animated.event([{
    nativeEvent: {
      contentOffset: { y: this.state.animValue },
    },
  }]);

  onScrollEndDrag = ({ nativeEvent }: OnScrollEvent) => {
    if (nativeEvent.targetContentOffset.y > this.state.calendarHeight / 2) {
      this.scrollView.scrollTo({
        x: 0,
        y: this.state.calendarHeight,
        animated: true,
      });
    } else {
      this.scrollView.scrollTo({
        x: 0,
        y: (this.state.calendarHeight - MIN_HEADER_H) - 65,
        animated: true,
      });
    }
  };

  renderShortHeader() {
    const { animValue, calendarHeight, currentDay } = this.state;

    const opacity = animValue.interpolate({
      inputRange: [0, calendarHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const translateY = animValue.interpolate({
      inputRange: [0, calendarHeight],
      outputRange: [0, -14],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.shortHeaderCont, { opacity }]}>
        <Animated.Text
          style={[
            styles.shortHeaderText,
            { transform: [{ translateY }] },
          ]}
        >
          {moment(currentDay).format('DD MMMM YYYY')}
        </Animated.Text>
        <Total dayFoods={this.props.foodsStore.dayFoods} />
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
    const { foodsStore } = this.props;
    const height = SCREEN_H - (MIN_HEADER_H
      + (foodsStore.dayFoods.length * 80));

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.content}
          // eslint-disable-next-line no-return-assign
          ref={r => this.scrollView = r}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={this.onScrollEndDrag}
        >
          {this.renderCalendar()}

          {foodsStore.dayFoods.map(item => (
            <DayFoodItem key={`${Math.random() * 10000000}`} item={item} />
          ))}

          <View style={[styles.emptyView, { height }]} />
        </ScrollView>

        {this.renderShortHeader()}
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
    height: MIN_HEADER_H,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
  },

  shortHeaderText: {
    fontSize: 20,
    color: colors.white,
  },

  emptyView: {
    width: '100%',
    backgroundColor: colors.white,
  },
});
