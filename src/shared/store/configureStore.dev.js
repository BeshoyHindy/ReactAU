import { createStore, applyMiddleware, compose  } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

function configureStore(initialState) {
	if (process.env.BROWSER) {
		/* eslint-disable no-underscore-dangle */
		let store = createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware(thunk),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		);	
		/* eslint-enable */		
		if(process.env.NODE_ENV !== 'production' && module.hot) {
			module.hot.accept('../reducers', () => {
				store.replaceReducer(require('../reducers').default);
			});
		}
		return store;
	}
	else{
		return createStore(
			rootReducer,
			initialState,
			applyMiddleware(thunk)
		);
	}
}



module.exports =  configureStore;
