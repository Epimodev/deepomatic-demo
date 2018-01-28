// @flow

export type UploadType = 'url' | 'file'

export type DetectionQuery = {
  detectorType: string;
  uploadType: UploadType;
  data: string;
}

export type LaunchTaskResponse = {
  task_id: number;
}

export type TaskResponse<T> = {
  task: {
    id: number;
    status: 'pending' | 'success' | 'error';
    data: T
  }
}

export type DetectionBox = {
  proba: number;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

export type DetectionResponse = {
  boxes: { [x: string]: DetectionBox[] };
  width: number;
  height: number;
}

export type DetectedLabel = {
  label: string;
  count: number;
}

export type DetectedBox = DetectionBox & {
  id: string;
  label: string;
}

export type DetectedData = {
  detectedLabels: DetectedLabel[];
  boxes: DetectedBox[];
}
