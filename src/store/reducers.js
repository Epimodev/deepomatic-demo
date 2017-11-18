// @flow
import { combineReducers } from 'redux';
import configurationReducer from 'src/views/FormCards/reducer';
import type { ConfigurationState, Action as ConfigurationAction } from 'src/views/FormCards/types';

type State = {
  configuration: ConfigurationState
}

type Action =
  | ConfigurationAction

const reducers = combineReducers({
  configuration: configurationReducer,
});

export default reducers;
export type { State, Action };
