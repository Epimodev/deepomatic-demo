// @flow
import * as axios from 'axios';
import { wait } from 'src/utils/timeUtils';
import type { DetectionQuery, LaunchTaskResponse, TaskResponse, DetectionResponse } from './types';

const ressource = axios.create({
  baseURL: environment.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-APP-ID': environment.APP_ID,
    'X-API-KEY': environment.API_KEY,
  },
});

function launchDetectionWithUrl(detector: string, imageUrl: string): Promise<number> {
  const urlParams = { url: imageUrl };
  const requestOptions = { params: urlParams };

  const request: axios.AxiosPromise<LaunchTaskResponse> =
    ressource.get(`/detect/${detector}`, requestOptions);

  return request.then(response => response.data.task_id);
}

function launchDetectionWithBase64(detector: string, imageBase64: string): Promise<number> {
  const headerEndIndex = imageBase64.indexOf(',') + 1;
  const imageWithoutHeader = imageBase64.slice(headerEndIndex);
  const requestBody = { base64: imageWithoutHeader };

  const request: axios.AxiosPromise<LaunchTaskResponse> =
    ressource.post(`/detect/${detector}`, requestBody);

  return request.then(response => response.data.task_id);
}

function launchDetection(query: DetectionQuery): Promise<number> {
  switch (query.uploadType) {
    case 'url':
      return launchDetectionWithUrl(query.detectorType, query.data);
    case 'file':
      return launchDetectionWithBase64(query.detectorType, query.data);
    default:
      throw new Error('Unknown upload type');
  }
}

function getResults<T>(taskId: number): Promise<T> {
  const request: axios.AxiosPromise<TaskResponse<T>> = ressource.get(`/tasks/${taskId}`);
  return request
    .then((response) => {
      switch (response.data.task.status) {
        case 'pending':
          return wait(500)().then(() => getResults(taskId));
        case 'success':
          return response.data.task.data;
        default:
          throw new Error(`Unknown task status : "${response.data.task.status}"`);
      }
    });
}

export function detectObjects(query: DetectionQuery): Promise<DetectionResponse> {
  return launchDetection(query).then(getResults);
}
