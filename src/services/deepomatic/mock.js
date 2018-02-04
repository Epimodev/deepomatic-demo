/**
 * Mock function to simulate detection without calling Deepomatic API
 */
import mockData from '../../../example/data.json';
import { formatResponse } from './index';

const formattedData = formatResponse(mockData);


export function detectObjects() {
  return Promise.resolve(formattedData);
}
