import { createStore, applyMiddleware, compose  } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { routerMiddleware} from '../../react-router-redux/es';


function configureStore(initialState, history) {
	if (process.env.BROWSER) {
		let store = null;
		/* eslint-disable no-underscore-dangle */
		if (window.__REDUX_DEVTOOLS_EXTENSION__ ) {
			store = createStore(
				rootReducer,
				initialState,
				compose(
					applyMiddleware(thunk),
					window.__REDUX_DEVTOOLS_EXTENSION__(),
					applyMiddleware(routerMiddleware(history))
				)
			);	
		}else{
			store = createStore(
				rootReducer,
				initialState,
				compose(
					applyMiddleware(thunk),
					applyMiddleware(routerMiddleware(history))
				)
			);	
		}
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
			applyMiddleware(thunk),
			applyMiddleware(routerMiddleware(history))
		);
	}
}



export default configureStore;
