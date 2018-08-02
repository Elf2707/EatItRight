// @flow
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';

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
  }

  // eslint-disable-next-line react/no-unused-prop-types
  renderItem = ({ item }: { item: FoodItemData }) => (
    <FoodItem
      componentId={this.props.componentId}
      item={item}
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.foodsStore.allFoods.slice()}
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
