import 'babel-polyfill';
require ("font-awesome-sass-loader");
require.context('./fonts', true, /\.?/);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

import Routes from './route/index';
import configureStore from './store/configureStore';
import { loadCategories } from './actions/adminActions';
import {hodeXsNavAction} from './actions/modalAction';

const initialState = window.__REDUX_STATE__ || {};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends React.Component {
	hideXsNav() {
		store.dispatch(hodeXsNavAction);
	}
	render() {
		return (
			<Provider store={store}>
				<Routes history={history} hideXsNav={this.hideXsNav}/>
			</Provider>
		);
	}
}

