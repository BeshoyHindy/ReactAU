import React from 'react';
import { render as ReactDOMRender} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { fetchSsrComps, ClientApp} from './App';
import createHistory from 'history/createBrowserHistory';
import configureStore from '../shared/store/configureStore';

const initialState = window.__REDUX_STATE__ || {};
const history = createHistory();
const store = configureStore(initialState, history);


function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

function renderApp(TheApp) {
	if (process.env.NODE_ENV !== 'development') {
		//disable code spliting on development(due to react hot loader 3 not support dynamic import code spliting)
		fetchSsrComps().promise.then((Comps)=>{
			ReactDOMRender(
				<AppContainer>
					<TheApp Comps={Comps} store={store} history={history}/>
				</AppContainer>,
				document.getElementById('rootWrap')
			);
		})
		.catch(errorLoading);
	}

	ReactDOMRender(
		<AppContainer>
			<TheApp store={store} history={history}/>
		</AppContainer>,
		document.getElementById('rootWrap')
	);
	return;	

}

// Hot Module Replacement API
if (process.env.NODE_ENV === 'development' && module.hot) {
	// Accept changes to this file for hot reloading.
	module.hot.accept('./index.js');
	
	// Any changes to our App will cause a hotload re-render.			
	module.hot.accept(
		'./App.js', 
		() => renderApp(require('./App').ClientApp, true)
	);
}


renderApp(ClientApp);

