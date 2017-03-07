import fs from 'fs';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import serializeJs  from 'serialize-javascript';
import MobileDetect from 'mobile-detect';

import createRoutes from '../shared/route/lazyRoute';
// import createRoutes from '../shared/route/index';
import configureStore from '../shared/store/configureStore';
import {hodeXsNavAction} from '../shared/actions/modalAction';

import { fetchComponentsData,
         getMetaDataFromState,
         getIp
	} from './utils';


let asset = JSON.parse(fs.readFileSync('./webpack-assets.json'));
let manifest = (process.env.NODE_ENV === 'production')?fs.readFileSync(`./public/build/${asset.manifest.js}`):"";


const history = createMemoryHistory();
const store = configureStore();

function hideXsNav() {
	store.dispatch(hodeXsNavAction);
}

function handleRender(req, res) 
{

	const routes = createRoutes(store, hideXsNav);
	const location = req.url;
	let vendorJs =(process.env.NODE_ENV === 'production')
						? `/build/${asset.vendor.js}`
						: '/dll.vendor.js';

	const md = new MobileDetect(req.headers['user-agent']);
	let device = {mobile: md.mobile()||md.phone(), tablet: md.tablet(), os: md.os() };
	asset.bundle.js = (process.env.NODE_ENV === 'production')
							? asset.bundle.js
							:'bundle.js';
				
  match({ routes, location }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		res.redirect(301, redirectLocation.pathname + redirectLocation.search);
	} else if (error) {
		res.status(500).render('500', error);
	} else if (renderProps == null) {
		res.status(404).render('404');
	} else {
		
		fetchComponentsData({
                 dispatch   : store.dispatch,
                 components : renderProps.components,
                 params     : renderProps.params,
                 query      : renderProps.location.query,
                 route      : renderProps.routes[renderProps.routes.length - 1],
				device,
                })
                .then(() => {
                let reduxState = store.getState();
                let metaData = getMetaDataFromState({
                    params : renderProps.params,
                    query  : renderProps.location.query,
                    route  : renderProps.routes[renderProps.routes.length - 1].path,
                    state  : reduxState,
					pathname: renderProps.location.pathname
                });
                
                const componentHTML = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
				reduxState = serializeJs(reduxState, { isJSON: true });
                res.render('index', { componentHTML, reduxState, vendorJs, metaData, asset, manifest });	
                })
                .catch(error => {
                    console.log( error);
                    res.status(500).json({
                        err:error.message
                    });
            });
		}
	});
}

export default handleRender;

