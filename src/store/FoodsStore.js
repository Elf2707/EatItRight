// @flow
import { action, observable } from 'mobx';
import data from '../data';

export default class FoodsStore {
  @observable allFoods: Array<FoodItemData> = [];
  @observable dayFoods: Array<DayFoodItemData> = [];
  @observable selectedDate: Date = new Date();

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
    this.dayFoods = this.dayFoods.concat(item);
  }

  @action
  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }

  @action
  deleteFoodItem(id: number) {
    this.allFoods = this.allFoods.filter(i => i.id !== id);
  }

  @action
  deleteDayFoodItem(id: number) {
    this.dayFoods = this.dayFoods.filter(i => i.id !== id);
  }
}
