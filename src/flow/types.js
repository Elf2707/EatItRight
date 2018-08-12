// @flow

// Events
export type OnLayoutEvent = {
  nativeEvent: {
    layout: {
      x: number,
      y: number,
      width: number,
      height: number,
    },
  },
};

export type OnSnapEvent = {
  index: number,
  id: ?number,
  target: number,
};

export type OnScrollEvent = {
  nativeEvent: {
    contentInset: {
      bottom: number,
      top: number,
      left: number,
      right: number,
    },
    zoomScale: number,
    contentOffset: {
      y: number,
      x: number,
    },
    targetContentOffset: {
      y: number,
      x: number,
    },
    layoutMeasurement: {
      height: number,
      width: number,
    },
    contentSize: {
      height: number,
      width: number,
    },
    velocity: {
      y: number,
      x: number,
    },
  },
};

export type OnKeyboardEvent = {
  easing: string,
  duration: number,
  endCoordinates: {
    height: number,
    screenX: number,
    width: number,
    screenY: number
  },
  startCoordinates: {
    height: number,
    screenX: number,
    width: number,
    screenY: number,
  },
};

export type OnFocusEvent = {
  nativeEvent: {
    target: number,
    text: string,
    eventCount: number,
  },
};

export type KeyboardEventListener = {
  remove: () => void,
};

export type OnSegmentChange = {
  nativeEvent: {
    value: string,
    selectedSegmentIndex: number,
    target: number,
  },
};

// Stores
export type SettingsStoreData = {

};

export type FoodsStoreData = {
  dayFoods: Array<DayFoodItemData>,
  getAllFoods: () => void,
};

export type MainStoreData = {
  foodsStore: FoodsStoreData,
  settingsStore: SettingsStoreData,
};
