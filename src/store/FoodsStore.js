// @flow
import { action, observable } from 'mobx';
import data from '../data';

export default class FoodsStore {
  @observable allFoods: Array<FoodItemData> = [];
  @observable dayFoods: Array<DayFoodItemData> = data.dayFoodStuff;

  store: MainStore;

  constructor(store: MainStore) {
    this.store = store;
  }

  @action
  getAllFoods() {
    this.allFoods = data.foodStuff;
    return this.allFoods;
  }

  @action
  getDayFoods() {
    return this.dayFoods;
  }
}
