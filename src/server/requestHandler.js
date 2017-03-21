import fs from 'fs';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import serializeJs  from 'serialize-javascript';
import MobileDetect from 'mobile-detect';
import request from 'request';

import configureStore from '../shared/store/configureStore';
import App from '../shared/components/App';
import routes from '../shared/route';

import { getMetaDataFromState, fetchComponentsData} from './utils';

let asset = JSON.parse(fs.readFileSync('./webpack-assets.json'));
const store = configureStore();

function ssr(match, res, req){
	const context = {};
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
	let manifest = null;
	
	if (process.env.NODE_ENV === 'production') {
		manifest = fs.readFileSync(`./public/${asset.manifest.js}`);
		res.render('index', { componentHTML, reduxState,  metaData, asset, manifest });
	}else{
		request(asset.manifest.js, function (error, response, body) {
			if (error)
				manifest = "";

			manifest = body;
			res.render('index', { componentHTML, reduxState, metaData, asset, manifest });
		});

	}
		
}

function handleRender(req, res)
{	
	const location = req.url;


	const md = new MobileDetect(req.headers['user-agent']);
	let device = {mobile: md.mobile()||md.phone(), tablet: md.tablet(), os: md.os() };
	let components = [];
	let actions = [];
	let authorize = [];
	let match = {};
	routes.some(route => {
		match = matchPath(req.url, route);
		if (match){
			actions = actions.concat(route.actions || []);
			components.push(route.component);
			authorize = authorize.concat(route.authorize || []);
			route.routes && route.routes.some(r => {
				match = matchPath(req.url, r);
				if (match){
					actions = actions.concat(r.actions || []);
					components.push(r.component);
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
			components 	: components,
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

