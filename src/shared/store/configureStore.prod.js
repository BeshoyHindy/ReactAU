import { createStore, applyMiddleware, compose  } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

function configureStore(initialState) {
    return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk)
    );
}

module.exports =  configureStore;
