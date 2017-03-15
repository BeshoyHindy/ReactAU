import fs from 'fs';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import serializeJs  from 'serialize-javascript';
import MobileDetect from 'mobile-detect';

import configureStore from '../shared/store/configureStore';
import App from '../shared/components/App';
import routes from '../shared/route';

import { getMetaDataFromState, fetchComponentsData} from './utils';


let asset = JSON.parse(fs.readFileSync('./webpack-assets.json'));
let manifest = (process.env.NODE_ENV === 'production')?fs.readFileSync(`./public/build/${asset.manifest.js}`):"";


const store = configureStore();

function ssr(match, res, req){
	const context = {};
	let vendorJs =(process.env.NODE_ENV === 'production')
						? `/build/${asset.vendor.js}`
						: '/dll.vendor.js';	
	let reduxState = store.getState();
	let metaData = getMetaDataFromState({
		params : match.params || {},
		query  : match.query || "",
		route  : match.path || "",
		state  : reduxState,
		pathname: match.url || req.url
	});

	reduxState = serializeJs(reduxState, { isJSON: true });
	const componentHTML = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context} >
					<App url={req.url}  level={0}/>
				</StaticRouter>
			</Provider>
		);
	res.render('index', { componentHTML, reduxState, vendorJs, metaData, asset, manifest });
}

function handleRender(req, res)
{	
	const location = req.url;


	const md = new MobileDetect(req.headers['user-agent']);
	let device = {mobile: md.mobile()||md.phone(), tablet: md.tablet(), os: md.os() };
	asset.bundle.js = (process.env.NODE_ENV === 'production')
							? asset.bundle.js
							:'bundle.js';

	let components = [];
	let actions = [];
	let authorize = [];
	let match = {};
	routes.some(route => {
		match = matchPath(req.url, route);
		if (match){
			actions = actions.concat(route.actions || []);
			components.push(route);
			authorize = authorize.concat(route.authorize || []);
			route.routes && route.routes.some(r => {
				match = matchPath(req.url, r);
				if (match){
					actions = actions.concat(r.actions || []);
					components.push(r);
					authorize = authorize.concat(r.authorize || []);			
				}
				return match;
			});
		}
		return match;
	});

	if (!components.length){
		return ssr({}, res, req)
	}

	fetchComponentsData({
			dispatch   : store.dispatch,
			actions 	: actions,
			params     : match.params ,
			query      : match.query,
			authorize,
			device,
	})
	.then(() => {
		return ssr(match, res, req);
	})
	.catch(error => {
		console.log( error);
		res.status(500).json({
			err:error.message
		});
	});

}

export default handleRender;

