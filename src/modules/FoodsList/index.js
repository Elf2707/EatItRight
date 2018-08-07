// @flow
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Navigation } from 'react-native-navigation';

import { colors } from '../../common/ui';
import FoodItem from './components/FoodItem';

type Props = {
  foodsStore: FoodsStoreData,
  componentId: string,
};

@inject('foodsStore')
@observer
export default class FoodsList extends React.Component<Props> {
  componentDidMount() {
    this.props.foodsStore.getAllFoods();
    Navigation.events().bindComponent(this);
  }

  searchBarUpdated({ text }: { text: string }) {
    this.props.foodsStore.setFoodItemsFilter(text);
  }

  // eslint-disable-next-line react/no-unused-prop-types
  renderItem = ({ item }: { item: FoodItemData }) => {
    const { componentId, foodsStore } = this.props;

    return (
      <FoodItem
        componentId={componentId}
        item={item}
        deleteFoodItem={() => foodsStore.deleteFoodItem(item.id)}
      />
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.foodsStore.filteredFoodItems}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={() => `${Math.random() * 10000000}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    width: '100%',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.gray1,
  },
});
