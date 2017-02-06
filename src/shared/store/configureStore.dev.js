import { createStore, applyMiddleware, compose  } from 'redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import DevTools from '../components/Shared/DevTools';

function configureStore(initialState) {
	if (process.env.BROWSER) {
		let store = createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware(thunk),
				DevTools.instrument(),
				persistState(
						window.location.href.match(
						/[?&]debug_session=([^&#]+)\b/
						)
					)
				) 
		);	
		
		if(process.env.NODE_ENV == 'development' && module.hot) {
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
