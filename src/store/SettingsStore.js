// @flow
import { action, observable, computed, extendObservable } from 'mobx';

const LIFE_STYLES = [
  {
    name: 'minimum',
    description: 'МИНИМАЛЬНАЯ - СИДЯЧАЯ РАБОТА',
    koef: 1.2,
  },
  {
    name: 'medium',
    description: 'СРЕДНИЙ - МНОГО ХОЖУ ИЛИ ЕЗЖУ',
    koef: 1.275,
  },
  {
    name: 'hard',
    description: 'ПОСТОЯННАЯ ЛЕГКАЯ НАГРУЗКА',
    koef: 1.55,
  },
  {
    name: 'very hard',
    description: 'ПОСТОЯННАЯ СРЕДНЯЯ/ТЯЖЕЛАЯ НАГРУЗКА',
    koef: 1.725,
  },
  {
    name: 'extremal',
    description: 'ПОСТОЯННАЯ СВЕРХТЯЖЕЛАЯ НАГРУЗКА',
    koef: 1.9,
  },
];

export default class SettingsStore {
  @observable weight: number = 80;
  @observable height: number = 185;
  @observable age: number = 30;
  @observable waist: number = 80;
  @observable protsPerc: number = 30;
  @observable fatsPerc: number = 20;
  @observable carbsPerc: number = 50;
  @observable lifeStyle: LifeStyleType = 'minimum';
  @observable sex: SexType = 'male';

  store: MainStoreData;

  constructor(store: MainStoreData) {
    this.store = store;
  }

  @action
  saveSetting(settings: SettingsData) {
    if (!settings) return;
    extendObservable(this, { ...settings });
  }
}
