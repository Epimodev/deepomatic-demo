// @flow
import * as types from './types';

export function showResultConfig(): types.ShowResultConfigAction {
  return { type: 'SHOW_RESULT_CONFIG' };
}

export function hideResultConfig(): types.HideResultConfigAction {
  return { type: 'HIDE_RESULT_CONFIG' };
}
