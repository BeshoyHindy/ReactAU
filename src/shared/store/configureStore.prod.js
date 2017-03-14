import { createStore, applyMiddleware, compose  } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { routerMiddleware} from 'react-router-redux';


function configureStore(initialState, history) {
    return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk),
			applyMiddleware(routerMiddleware(history))
		)
    );
}

export default configureStore;
