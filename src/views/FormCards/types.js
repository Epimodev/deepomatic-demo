// @flow
import type { UploadType } from 'src/services/deepomatic/types';

type Configuration = {
  +detectionType: string;
  +uploadType: UploadType;
  +imageUrl: string;
  +fileValue: string;
}

export type ConfigurationState = {
  +currentStep: number;
  +detectionType: string;
  +uploadType: UploadType;
  +imageUrl: string;
  +fileValue: string;
  +fileError: string;
  +isDetecting: boolean;
  +detectionFailed: boolean;
  +onboardingFinished: boolean;
  +detectedConfig: Configuration;
}

export type ChangeTypeAction = {
  type: 'CHANGE_DETECTION_TYPE';
  payload: string;
}
export type ChangeUpladTypeAction = {
  type: 'CHANGE_UPLOAD_TYPE';
  payload: UploadType;
}
export type ChangeImageUrlAction = {
  type: 'CHANGE_IMAGE_URL';
  payload: string;
}
export type ChangeImageFileAction = {
  type: 'CHANGE_IMAGE_FILE';
  payload: string;
}
export type SetImageFileErrorAction = {
  type: 'SET_IMAGE_FILE_ERROR';
  payload: string;
}
export type PreviousStepAction = {
  type: 'PREVIOUS_STEP';
}
export type NextStepAction = {
  type: 'NEXT_STEP';
}
export type LaunchDetectionAction = {
  type: 'LAUNCH_DETECTION';
}
export type ErrorDetectionAction = {
  type: 'DETECTION_ERROR';
}
export type CloseErrorAction = {
  type: 'CLOSE_ERROR';
}

export type Action =
  | ChangeTypeAction
  | ChangeUpladTypeAction
  | ChangeImageUrlAction
  | ChangeImageFileAction
  | SetImageFileErrorAction
  | PreviousStepAction
  | NextStepAction
  | LaunchDetectionAction
  | ErrorDetectionAction
  | CloseErrorAction
