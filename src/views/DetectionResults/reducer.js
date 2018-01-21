// @flow
import type { Action } from 'src/store';
import * as types from './types';

const initialState: types.ResultState = {
  configIsDisplayed: false,
  boxes: {},
  width: 0,
  height: 0,
  overKey: '',
};

export default function reducer(
  state: types.ResultState = initialState,
  action: Action,
): types.ResultState {
  switch (action.type) {
    case 'DETECTION_SUCCESS':
      return {
        ...state,
        boxes: action.payload.boxes,
        width: action.payload.width,
        height: action.payload.height,
        configIsDisplayed: false,
      };
    case 'SHOW_RESULT_CONFIG':
      return {
        ...state,
        configIsDisplayed: true,
      };
    case 'HIDE_RESULT_CONFIG':
      return {
        ...state,
        configIsDisplayed: false,
      };
    default:
      return state;
  }
}
