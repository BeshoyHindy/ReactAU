import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter} from '../react-router-redux/es';
import createHistory from 'history/createBrowserHistory';

import "font-awesome-sass-loader";
require.context('../shared/fonts', true, /\.?/);


import configureStore from '../shared/store/configureStore';
import App from '../shared/components/App';

const initialState = window.__REDUX_STATE__ || {};
const history = createHistory();
const store = configureStore(initialState, history);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Router>
				<App/>
			</Router>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('rootWrap')
);

