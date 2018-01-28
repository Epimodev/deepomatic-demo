// @flow
import type { Action } from 'src/store';
import * as types from './types';

const initialState: types.ResultState = {
  configIsDisplayed: false,
  detectedLabels: [],
  boxes: [],
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
        detectedLabels: action.payload.detectedLabels,
        boxes: action.payload.boxes,
        configIsDisplayed: false,
      };
    case 'OVER_DETECTED_TYPE':
      return {
        ...state,
        overKey: action.payload,
      };
    case 'LEAVE_DETECTED_TYPE':
      return {
        ...state,
        overKey: '',
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
