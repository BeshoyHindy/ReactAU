import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router , matchPath} from 'react-router-dom';
import { ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

require.context('font-awesome.fonts', true, /\.?/);
require.context('../shared/fonts', true, /\.?/);
require.context('../shared/img', true, /\.?/);
require("font-awesome.css");
require("bootstrap.css");	

import routes from '../shared/route/index';

import App from '../shared/components/App';

let promises = [], match = null;

function fetchSsrComps(){
	routes.some(route => {
		let url = window.location.pathname;
		match = matchPath( window.location.pathname, route);
		if (match){
			promises.push(System.import(`../shared/components/${route.componentPath}`));
			route.routes && route.routes.some(r => {
				match = matchPath(url, r);
				if (match){
					promises.push(System.import(`../shared/components/${r.componentPath}`));
				}
				return match;
			});
		}
		return match;
	});
	return {promise: Promise.all(promises)};
}


//https://github.com/reactjs/react-router-redux/issues/179
//need to wrap as compnent to let HMR work
class ClientApp extends React.Component {
	render() {
		let {store, history, Comps} = this.props;
		return (	
			<Provider store={store} >
				<ConnectedRouter history={history}>
					<App Comps={Comps} url={window.location.pathname} level={0}/>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export {ClientApp, fetchSsrComps};
