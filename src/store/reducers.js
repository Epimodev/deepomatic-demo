// @flow
import { combineReducers } from 'redux';
import configurationReducer from 'src/views/FormCards/reducer';
import resultReducer from 'src/views/DetectionResults/reducer';
import type { ConfigurationState, Action as ConfigurationAction } from 'src/views/FormCards/types';
import type { ResultState, Action as ResultAction } from 'src/views/DetectionResults/types';

type State = {
  configuration: ConfigurationState;
  result: ResultState;
}

type Action =
  | ConfigurationAction
  | ResultAction

const reducers = combineReducers({
  configuration: configurationReducer,
  result: resultReducer,
});

export default reducers;
export type { State, Action };
