// @flow
import type { DetectedLabel, DetectedBox, DetectedData } from 'src/services/deepomatic/types';

export type ResultState = {
  configIsDisplayed: boolean;
  detectedLabels: DetectedLabel[];
  boxes: DetectedBox[];
  overKey: string;
}

export type SuccessDetectionAction = {
  type: 'DETECTION_SUCCESS';
  payload: DetectedData;
}

export type OverDetectedKeyAction = {
  type: 'OVER_DETECTED_TYPE';
  payload: string;
}

export type LeaveDetectedKeyAction = {
  type: 'LEAVE_DETECTED_TYPE';
}

export type ShowResultConfigAction = {
  type: 'SHOW_RESULT_CONFIG';
}

export type HideResultConfigAction = {
  type: 'HIDE_RESULT_CONFIG';
}

export type Action =
  | SuccessDetectionAction
  | OverDetectedKeyAction
  | LeaveDetectedKeyAction
  | ShowResultConfigAction
  | HideResultConfigAction
