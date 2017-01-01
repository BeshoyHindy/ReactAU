import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';

import createRoutes from '../client/route/index';
import configureStore from '../client/store/configureStore';
import renderFullPage from './generateHTML';

function handleRender(req, res) 
{
  const history = createMemoryHistory();
  const store = configureStore();
  const initialState = store.getState()

  const routes = createRoutes(history);

//   let location = createLocation(req.url);
  const location = req.url;

  match({ routes, location }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		res.redirect(301, redirectLocation.pathname + redirectLocation.search);
	} else if (error) {
		res.status(500).render('500', error);
	} else if (renderProps == null) {
		res.status(404).render('404');
	} else {
		let html = renderToString(
			<Provider store={store}>
				<RouterContext {...renderProps} />
			</Provider>
		);
		res.status(200).send(renderFullPage(html,initialState))
	}});
}

module.exports = handleRender;

