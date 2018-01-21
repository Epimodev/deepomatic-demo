// @flow
import * as types from './types';

export function overDetectedKey(key: string): types.OverDetectedKeyAction {
  return {
    type: 'OVER_DETECTED_TYPE',
    payload: key,
  };
}

export function leaveDetectedKey(): types.LeaveDetectedKeyAction {
  return { type: 'LEAVE_DETECTED_TYPE' };
}

export function showResultConfig(): types.ShowResultConfigAction {
  return { type: 'SHOW_RESULT_CONFIG' };
}

export function hideResultConfig(): types.HideResultConfigAction {
  return { type: 'HIDE_RESULT_CONFIG' };
}
