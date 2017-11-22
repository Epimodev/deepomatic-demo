// @flow
import type { Action } from 'src/store';
import * as types from './types';

const initialState: types.ConfigurationState = {
  currentStep: 0,
  detectionType: '',
  uploadType: 'url',
  imageUrl: '',
  fileValue: '',
  fileError: '',
  isDetecting: false,
  onboardingFinished: false,
};

export default function reducer(
  state: types.ConfigurationState = initialState,
  action: Action,
): types.ConfigurationState {
  switch (action.type) {
    case 'CHANGE_DETECTION_TYPE':
      return {
        ...state,
        detectionType: action.payload,
      };
    case 'CHANGE_UPLOAD_TYPE':
      return {
        ...state,
        uploadType: action.payload,
      };
    case 'CHANGE_IMAGE_URL':
      return {
        ...state,
        imageUrl: action.payload,
      };
    case 'CHANGE_IMAGE_FILE':
      return {
        ...state,
        fileValue: action.payload,
        fileError: '',
      };
    case 'SET_IMAGE_FILE_ERROR':
      return {
        ...state,
        fileValue: '',
        fileError: action.payload,
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case 'LAUNCH_DETECTION':
      return {
        ...state,
        isDetecting: true,
      };
    case 'DETECTION_ERROR':
      return {
        ...state,
        isDetecting: false,
      };
    case 'DETECTION_SUCCESS':
      return {
        ...state,
        isDetecting: false,
        onboardingFinished: true,
      };
    default:
      return state;
  }
}
