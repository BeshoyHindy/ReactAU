import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { match,  browserHistory, Router } from 'react-router';


import "font-awesome-sass-loader";
require.context('../shared/fonts', true, /\.?/);


import configureStore from '../shared/store/configureStore';
import { loadCategories } from '../shared/actions/adminActions';
import {hodeXsNavAction} from '../shared/actions/modalAction';

const initialState = window.__REDUX_STATE__ || {};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

function hideXsNav() {
	store.dispatch(hodeXsNavAction);
}

let Routes;



if (process.env.NODE_ENV === 'production') {
	//enable code spliting for production
	let createRoutes = require('../shared/route/lazyRoute').default;
	Routes = createRoutes(store, hideXsNav);
	render(
		<Provider store={store}>
			<Router history={history} routes={Routes} />
		</Provider>,
		document.getElementById('rootWrap')
	);
}else{
	//disable code spliting for development, then HMR work

	Routes = require('../shared/route/index');
	//https://github.com/reactjs/react-router-redux/issues/179
	//need to wrap as compnent to let HMR work
	class App extends React.Component {
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
	render(
		<App/>,
		document.getElementById('rootWrap')
	);
}


