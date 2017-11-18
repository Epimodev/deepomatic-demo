// @flow
import type { ActionThunk } from 'src/store';
import * as types from './types';

export function changeType(name: string, becomeChecked: boolean): types.ChangeTypeAction {
  const detectionType = becomeChecked
    ? name
    : '';

  return {
    type: 'CHANGE_DETECTION_TYPE',
    payload: detectionType,
  };
}

export function changeUploadType(value: 'left' | 'right'): types.ChangeUpladTypeAction {
  const isUrl = value === 'left';
  const uploadType = isUrl ? 'url' : 'file';

  return {
    type: 'CHANGE_UPLOAD_TYPE',
    payload: uploadType,
  };
}

export function changeImageUrl(value: string): types.ChangeImageUrlAction {
  return {
    type: 'CHANGE_IMAGE_URL',
    payload: value,
  };
}

export function previousStep(): types.PreviousStepAction {
  return { type: 'PREVIOUS_STEP' };
}

export function nextStep(): types.NextStepAction {
  return { type: 'NEXT_STEP' };
}

export function submitConfiguration(): ActionThunk {
  return (dispatch) => {
    dispatch({ type: 'SUBMIT_CONFIGURATION' });
  };
}
