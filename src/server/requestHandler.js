import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';

import createRoutes from '../client/route/index';
import configureStore from '../client/store/configureStore';

import { fetchComponentsData,
         getMetaDataFromState,
         detectLocale,
         getIp
	 } from './utils';


function handleRender(req, res) 
{
  const history = createMemoryHistory();
  const store = configureStore();
  const routes = createRoutes(history);

//   let location = createLocation(req.url);
  const location = req.url;
  const venderJs =(process.env.NODE_ENV === 'production')
  					? '/build/vendor.js'
					: '/build/dll.vendor.js';
					
  match({ routes, location }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		res.redirect(301, redirectLocation.pathname + redirectLocation.search);
	} else if (error) {
		res.status(500).render('500', error);
	} else if (renderProps == null) {
		res.status(404).render('404');
	} else {
	//	console.log(renderProps);
		// fetchComponentsData({
        //         dispatch   : store.dispatch,
        //         components : renderProps.components,
        //         params     : renderProps.params,
        //         query      : renderProps.location.query
        //     })
            // .then(() => {
				const initialState = store.getState()
                const metaData = getMetaDataFromState({
                    params : renderProps.params,
                    query  : renderProps.location.query,
                    route  : renderProps.routes[renderProps.routes.length - 1].path,
                    state  : initialState
                });

				const componentHTML = renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps} />
					</Provider>
				);
				res.render('index', { componentHTML, reduxState: initialState, venderJs, metaData });	
			// })
		}
	});
}

module.exports = handleRender;

