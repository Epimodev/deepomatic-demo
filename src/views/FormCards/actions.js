// @flow
import type { ActionThunk } from 'src/store';
import { detectObjects } from 'src/services/deepomatic';
import messages from 'src/messages';
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

export function changeFile(file: File): ActionThunk {
  return (dispatch) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result64 = reader.result;
      if (typeof result64 === 'string') {
        if (result64.startsWith('data:image/jpeg;') || result64.startsWith('data:image/png;')) {
          dispatch({
            type: 'CHANGE_IMAGE_FILE',
            payload: result64,
          });
        } else {
          dispatch({
            type: 'SET_IMAGE_FILE_ERROR',
            payload: messages.FILE_ERROR,
          });
        }
      }
    };
    reader.onerror = () => {
      dispatch({
        type: 'SET_IMAGE_FILE_ERROR',
        payload: messages.FILE_ERROR,
      });
    };

    reader.readAsDataURL(file);
  };
}

export function previousStep(): types.PreviousStepAction {
  return { type: 'PREVIOUS_STEP' };
}

export function nextStep(): types.NextStepAction {
  return { type: 'NEXT_STEP' };
}

export function submitConfiguration(): ActionThunk {
  return (dispatch, getState) => {
    const { configuration } = getState();

    const data = configuration.uploadType === 'url'
      ? configuration.imageUrl
      : configuration.fileValue;

    const query = {
      detectorType: configuration.detectionType,
      uploadType: configuration.uploadType,
      data,
    };

    dispatch({ type: 'SUBMIT_CONFIGURATION' });
    detectObjects(query)
      .then((detectionData) => {
        console.log(detectionData);
      });
  };
}
