if (!process.env.BROWSER) {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router , matchPath} from 'react-router-dom';
import { ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// import "font-awesome-sass-loader";
require.context('../shared/fonts', true, /\.?/);

import routes from '../shared/route/index';
import configureStore from '../shared/store/configureStore';
import App from '../shared/components/App';

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

const initialState = window.__REDUX_STATE__ || {};
const history = createHistory();
const store = configureStore(initialState, history);
let url = window.location.pathname;
let promises = [];
let match = null, Comps = [];

routes.some(route => {
	match = matchPath(url, route);
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


Promise.all(promises).then((Comps)=>{
	render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App Comps={Comps} url={url} level={0}/>
			</ConnectedRouter>
		</Provider>,
		document.getElementById('rootWrap')
	);
})
