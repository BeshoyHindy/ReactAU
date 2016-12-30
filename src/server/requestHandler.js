import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';

import createRoutes from '../client/route/index';
import configureStore from '../client/store/configureStore';


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
		//res.send(html); 
		res.status(200).send(renderFullPage(html,initialState))
	}});
}

module.exports = handleRender;

function renderFullPage(component,initialState){

 return `<!doctype html>
		<html>
			<head>
			 <title>Hi-Tech Digital CCTV</title>
  				<link href="https://fonts.googleapis.com/css?family=Lato|Oswald:400,700|Rajdhani|Ubuntu" rel="stylesheet">
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />			 
       			<link rel="stylesheet" href="/css/main.css">	   
			</head>
			<body>
				<div id="rootWrap">${component}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
				<script src="/dll/dll.vendor.js"></script>
				<script src="/bundle.js"></script>
			</body>
		</html>
   `
}
