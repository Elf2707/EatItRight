// @flow
/* eslint-disable class-methods-use-this */
import { action, observable, computed, runInAction, autorun } from 'mobx';
import _ from 'lodash';

import { settingsDbService } from '../dbServices';

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

    autorun(() => {
      console.log('tttttt --- autorun', this.sex);
    });
  }

  get lifeStyles(): Array<LifeStyleType> {
    return [
      'minimum',
      'light',
      'medium',
      'hard',
      'extremal',
    ];
  }

  // Avarage from Maffin-Geor and Ketch-McArdle formulas

  get baseCalories(): number {
    // Maffin-Geor
    const baseMG = (9.99 * this.weight) + (6.25 * this.height)
      - (4.92 * this.age) + (this.sex === 'male' ? 5 : -161);

    // Ketch-McArdle
    const fatPerc = ((4.15 * (this.waist / 2.54))
      - (0.082 * (this.weight / 0.454))
      - (this.sex === 'male' ? 98.42 : 76.76)) / (this.weight / 0.454);
    const baseKM = 370 + (21.6 * (this.weight - (this.weight * fatPerc / 100)));

    return (baseMG + baseKM) / 2;
  }

  @computed get sexIndex(): number {
    return this.sex === 'male' ? 0 : 1;
  }

  @computed get lifeStyleIndex(): number {
    return this.lifeStyles.findIndex(ls => this.lifeStyle === ls);
  }

  @computed get calories(): number {
    return _.round(this.baseCalories * this.getLifeStyleKoef());
  }

  @computed get proteinsLimit(): number {
    return _.round(((this.protsPerc / 100) * this.calories) / 4, 1);
  }

  @computed get fatsLimit(): number {
    return _.round(((this.fatsPerc / 100) * this.calories) / 9, 1);
  }

  @computed get carbsLimit(): number {
    return _.round(((this.carbsPerc / 100) * this.calories) / 4, 1);
  }

  @action
  saveSettings(settings: SettingsData) {
    if (!settings) return;
    this.setSettings(settings);
    settingsDbService.save(settings);
  }

  @action
  setSettings(settings: SettingsData) {
    Object.assign(this, settings);
  }

  getLifeStyleKoef(): number {
    switch (this.lifeStyle) {
      case 'minimum': return 1.2;
      case 'light': return 1.275;
      case 'middle': return 1.55;
      case 'hard': return 1.725;
      case 'extremal': return 1.9;
      default: return 1.2;
    }
  }
}
