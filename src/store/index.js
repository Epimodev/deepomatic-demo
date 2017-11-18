// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import type { Store, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import type { State, Action } from './reducers';

type GetState = () => State;
type Thunk<A> = (dispatch: Dispatch<A>, getState: GetState) => Promise<void> | void
type DispatchThunk<A> = (Thunk<A>) => A;

type ActionThunk = Thunk<Action>
type AppDispatch = Dispatch<Action> & DispatchThunk<Action>

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);
const enhancer = composeEnhancer(middleware);

const store: Store<State, Action> = createStore(reducers, enhancer);

export default store;
export type { State, Action, GetState, AppDispatch, ActionThunk };
