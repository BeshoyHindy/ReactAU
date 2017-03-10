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

function handleRender(req, res)
{
	const context = {};
	const location = req.url;
	let vendorJs =(process.env.NODE_ENV === 'production')
						? `/build/${asset.vendor.js}`
						: '/dll.vendor.js';

	const md = new MobileDetect(req.headers['user-agent']);
	let device = {mobile: md.mobile()||md.phone(), tablet: md.tablet(), os: md.os() };
	asset.bundle.js = (process.env.NODE_ENV === 'production')
							? asset.bundle.js
							:'bundle.js';

	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context} >
				<App/>
			</StaticRouter>
		</Provider>
	);
	if (context.url) {
		res.writeHead(301, {
			Location: context.url
		});
		res.end();
	} else {
		// console.log(context, location);
		const components = [];
		let match = {};
		routes.some(route => {
			match = matchPath(req.url, route);
			if (match){
				// console.log("-------------------------------------------------", match, req.url, route);
				components.push(route.component);
			}
			return match;
		});
// console.log("==========================================================", req.url);
		fetchComponentsData({
				dispatch   : store.dispatch,
				components : components,
				params     : match.params || context.match.params,
				query      : context.location.query,
				route      : context.authorize,
			device,
			})
			.then(() => {
			let reduxState = store.getState();
			let metaData = getMetaDataFromState({
				params : match.params || context.match.params,
				query  : context.location.query,
				route  : match.path || context.match.path,
				state  : reduxState,
				pathname: context.location.pathname
			});

			reduxState = serializeJs(reduxState, { isJSON: true });
			const componentHTML = ReactDOMServer.renderToString(
                   <Provider store={store}>
						<StaticRouter location={req.url} context={context} >
							<App/>
						</StaticRouter>
					</Provider>
                );
			res.render('index', { componentHTML, reduxState, vendorJs, metaData, asset, manifest });
			})
			.catch(error => {
				console.log( error);
				res.status(500).json({
					err:error.message
				});
		});
	}
}

export default handleRender;

