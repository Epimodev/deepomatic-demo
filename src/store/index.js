// @flow
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import configurationReducer from './configurationReducer';

const reducer = combineReducers({
  configuration: configurationReducer,
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);
const enhancer = composeEnhancer(middleware);

const store = createStore(reducer, enhancer);

export default store;
