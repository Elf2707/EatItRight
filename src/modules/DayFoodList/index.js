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

const SCREEN_H = Dimensions.get('window').height;
const SCROLL_THRESHOLD = 100;
const MIN_HEADER_H = 110;
const TOP_SCROLL_POS = 220;

type Props = {
  foodsStore: FoodsStoreData,
  componentId: string,
};

type State = {
  animValue: Animated.Value,
  calendarHeight: number,
  isLayoutDone: boolean,
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
    if (nativeEvent.contentOffset.y >= TOP_SCROLL_POS) return;

    if (Math.abs(nativeEvent.contentOffset.y) >= SCROLL_THRESHOLD) {
      this.scrollView.scrollTo({
        x: 0,
        y: TOP_SCROLL_POS,
        animated: true,
      });
    } else {
      this.scrollView.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  };

  renderShortHeader() {
    const { foodsStore } = this.props;
    const { animValue, calendarHeight } = this.state;

    const opacity = animValue.interpolate({
      inputRange: [0, calendarHeight - MIN_HEADER_H],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const translateY = animValue.interpolate({
      inputRange: [0, calendarHeight - MIN_HEADER_H],
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
          {moment(foodsStore.selectedDate).format('DD MMMM YYYY')}
        </Animated.Text>
        <Total dayFoods={foodsStore.dayFoods} />
      </Animated.View>
    );
  }

  renderCalendar() {
    const { foodsStore } = this.props;
    const { animValue, calendarHeight } = this.state;

    const opacity = animValue.interpolate({
      inputRange: [-calendarHeight, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{ opacity }}
        onLayout={this.onLayout}
      >
        <Calendar
          onDayPress={date => foodsStore.setSelectedDate(date)}
          selectedDate={foodsStore.selectedDate}
        />
      </Animated.View>
    );
  }

  render() {
    const { componentId, foodsStore } = this.props;
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
            <DayFoodItem
              componentId={componentId}
              item={item}
              deleteDayFoodItem={() => foodsStore.deleteDayFoodItem(item.id)}
              key={`${Math.random() * 10000000}`}
            />
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
