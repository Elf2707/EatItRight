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
