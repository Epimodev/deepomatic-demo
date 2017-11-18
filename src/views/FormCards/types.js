// @flow

export type UploadType = 'url' | 'file';
export type ConfigurationState = {
  +currentStep: number;
  +detectionType: string;
  +uploadType: UploadType | '';
  +imageUrl: string;
  +fileValue: string;
  +fileError: string;
}

export type ChangeTypeAction = {
  type: 'CHANGE_DETECTION_TYPE';
  payload: string;
}
export type ChangeUpladTypeAction = {
  type: 'CHANGE_UPLOAD_TYPE';
  payload: UploadType | '';
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
export type SubmitAction = {
  type: 'SUBMIT_CONFIGURATION';
}

export type Action =
  | ChangeTypeAction
  | ChangeUpladTypeAction
  | ChangeImageUrlAction
  | ChangeImageFileAction
  | SetImageFileErrorAction
  | PreviousStepAction
  | NextStepAction
  | SubmitAction
