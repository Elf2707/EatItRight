// @flow
export type FoodItemData = {
  id: number,
  name: string,
  protein: number,
  fat: number,
  carbohydrate: number,
};

export type DayFoodItemData = {
  id: number,
  name: string,
  added_at: string,
  weight: number,
  protein: number,
  fat: number,
  carbohydrate: number,
};

export type LifeStyleType = 'minimum'
  | 'medium'
  | 'hard'
  | 'very hard'
  | 'extremal';

export type SexType = 'male' | 'female';

export type SettingsData = {
  age: number,
  height: number,
  weight: number,
  waist: number,
  lifeStyle: LifeStyleType,
  sexType: SexType,
};
