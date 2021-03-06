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
  detectionFailed: false,
  onboardingFinished: false,
  detectedConfig: {
    detectionType: '',
    uploadType: 'url',
    imageUrl: '',
    fileValue: '',
  },
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
        detectionFailed: false,
      };
    case 'DETECTION_ERROR':
      return {
        ...state,
        isDetecting: false,
        detectionFailed: true,
      };
    case 'CLOSE_ERROR':
      return {
        ...state,
        detectionFailed: false,
      };
    case 'DETECTION_SUCCESS':
      return {
        ...state,
        isDetecting: false,
        onboardingFinished: true,
        detectedConfig: {
          detectionType: state.detectionType,
          uploadType: state.uploadType,
          imageUrl: state.imageUrl,
          fileValue: state.fileValue,
        },
      };
    case 'HIDE_RESULT_CONFIG':
      return {
        ...state,
        detectionType: state.detectedConfig.detectionType,
        uploadType: state.detectedConfig.uploadType,
        imageUrl: state.detectedConfig.imageUrl,
        fileValue: state.detectedConfig.fileValue,
      };
    default:
      return state;
  }
}
