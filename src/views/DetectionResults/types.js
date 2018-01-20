// @flow
import type { DetectionBox, DetectionResponse } from 'src/services/deepomatic/types';

export type ResultState = {
  configIsDisplayed: boolean;
  boxes: { [x: string]: DetectionBox[] };
  width: number;
  height: number;
  overKey: string;
}

export type SuccessDetectionAction = {
  type: 'DETECTION_SUCCESS';
  payload: DetectionResponse;
}

export type ShowResultConfigAction = {
  type: 'SHOW_RESULT_CONFIG';
}

export type HideResultConfigAction = {
  type: 'HIDE_RESULT_CONFIG';
}

export type Action =
  | SuccessDetectionAction
  | ShowResultConfigAction
  | HideResultConfigAction
