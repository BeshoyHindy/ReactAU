import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


import "font-awesome-sass-loader";
require.context('../shared/fonts', true, /\.?/);


import configureStore from '../shared/store/configureStore';
import App from '../shared/components/App';

const initialState = window.__REDUX_STATE__ || {};

const store = configureStore(initialState);

render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('rootWrap')
);

