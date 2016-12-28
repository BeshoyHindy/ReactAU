import 'babel-polyfill';
require('./sass/main.scss');
require("font-awesome-sass-loader");
require.context('./img', true, /\.?/);
require.context('./json', true, /\.?/);
require.context('./fonts', true, /\.?/);


import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router'

import createRoutes from './route/index';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


render((
  <Provider store={store}>
	{ createRoutes(history) }
  </Provider>
), document.getElementById("rootWrap"));

if(module.hot){
		module.hot.accept();
}
