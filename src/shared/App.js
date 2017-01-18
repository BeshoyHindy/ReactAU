import 'babel-polyfill';

require ('./sass/main.scss');
require ("font-awesome-sass-loader");
require.context('./fonts', true, /\.?/);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

import createRoutes from './route/index';
import configureStore from './store/configureStore';
import { loadCategories } from './actions/adminActions';

const initialState = window.__REDUX_STATE__ || {};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(loadCategories);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				{ createRoutes(history) }
			</Provider>
		);
	}
}

