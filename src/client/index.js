import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { match,  browserHistory, Router } from 'react-router';
import 'babel-polyfill';

import "font-awesome-sass-loader";
require.context('../shared/fonts', true, /\.?/);


// import Routes from './route/index';
import createRoutes  from '../shared/route/lazyRoute';
import configureStore from '../shared/store/configureStore';
import { loadCategories } from '../shared/actions/adminActions';
import {hodeXsNavAction} from '../shared/actions/modalAction';

const initialState = window.__REDUX_STATE__ || {};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

function hideXsNav() {
	store.dispatch(hodeXsNavAction);
}

let routes = createRoutes(store, hideXsNav);


match({ history, routes}, (error, redirectLocation, renderProps) => {
	if (error) {
		console.log(error);
	}
	render(
		<Provider store={store}>
			<Router history={history} {...renderProps} >
				{routes}
			</Router>
		</Provider>,
		document.getElementById('rootWrap')
	);
});
