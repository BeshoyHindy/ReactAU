import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import serializeJs  from 'serialize-javascript';


import createRoutes from '../shared/route/index';
import configureStore from '../shared/store/configureStore';

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

  const location = req.url;
  const venderJs =(process.env.NODE_ENV === 'production')
  					? '/build/vendor.js'
					: '/dll.vendor.js';
  const locale = detectLocale(req);
					
  match({ routes, location }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		res.redirect(301, redirectLocation.pathname + redirectLocation.search);
	} else if (error) {
		res.status(500).render('500', error);
	} else if (renderProps == null) {
		res.status(404).render('404');
	} else {
		// console.log(renderProps.routes[renderProps.routes.length - 1]);
		 fetchComponentsData({
                 dispatch   : store.dispatch,
                 components : renderProps.components,
                 params     : renderProps.params,
                 query      : renderProps.location.query,
                 route      : renderProps.routes[renderProps.routes.length - 1]
                })
                .then(() => {
                const reduxState = store.getState();
                const metaData = getMetaDataFromState({
                    params : renderProps.params,
                    query  : renderProps.location.query,
                    lang   : locale,
                    route  : renderProps.routes[renderProps.routes.length - 1].path,
                    state  : reduxState
                });
                
                const componentHTML = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                res.render('index', { componentHTML, reduxState, venderJs, metaData });	
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({
                        err:error.message
                    });
            });
		}
	});
}

module.exports = handleRender;

