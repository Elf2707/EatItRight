// @flow
import FoodsStore from './FoodsStore';

class Store {
  foodsStore: FoodsStoreData;

  constructor() {
    this.foodsStore = new FoodsStore(this);
  }
}

export default new Store();
