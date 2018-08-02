// @flow
import { action, observable } from 'mobx';
import data from '../data';

export default class FoodsStore {
  @observable allFoods: Array<FoodItemData> = [];
  @observable dayFoods: Array<DayFoodItemData> = [];

  store: MainStoreData;

  constructor(store: MainStoreData) {
    this.store = store;
  }

  @action
  getAllFoods() {
    this.allFoods = data.foodStuff;
  }

  @action
  getDayFoods() {
    this.dayFoods = data.dayFoodStuff1;
  }

  @action
  addNewDayFoodItem(item: DayFoodItemData) {
    console.log('ttttttttttttttt -- 000');
    console.log(item);
    console.log('ttttttttttttttt -- 111');
    this.dayFoods = this.dayFoods.concat(item);
  }
}
