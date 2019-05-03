import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { MainReducer } from './reducer';

// basic redux functions to be called in boilerplate
export default function configureStore(initialState) {
	const store = createStore(MainReducer, initialState, applyMiddleware(logger));
	return store;
}
