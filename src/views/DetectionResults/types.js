// @flow
import type { DetectionBox, DetectionResponse } from 'src/services/deepomatic/types';

export type ResultState = {
  boxes: { [x: string]: DetectionBox[] };
  width: number;
  height: number;
  overKey: string;
}

export type SuccessDetectionAction = {
  type: 'DETECTION_SUCCESS';
  payload: DetectionResponse;
}

export type Action =
  | SuccessDetectionAction
