// @flow
import AuthStore from './AuthStore';
import FoodsStore from './FoodsStore';
import SettingsStore from './SettingsStore';

class Store {
  foodsStore: FoodsStoreData;
  settingsStore: SettingsStoreData;
  authStore: AuthStoreData;

  constructor() {
    this.foodsStore = new FoodsStore(this);
    this.settingsStore = new SettingsStore(this);
    this.authStore = new AuthStore(this);
  }
}

export default new Store();
