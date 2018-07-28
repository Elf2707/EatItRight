// @flow
import FoodsStore from './FoodsStore';

class Store {
  foodsStore: FoodsStore;

  constructor() {
    this.foodsStore = new FoodsStore(this);
  }
}

export default new Store();
