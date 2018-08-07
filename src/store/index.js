// @flow
import FoodsStore from './FoodsStore';
import SettingsStore from './SettingsStore';

class Store {
  foodsStore: FoodsStoreData;
  settingsStore: SettingsStoreData;

  constructor() {
    this.foodsStore = new FoodsStore(this);
    this.settingsStore = new SettingsStore(this);
  }
}

export default new Store();
