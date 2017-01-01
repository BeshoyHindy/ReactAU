import ReactHotLoader from './components/ReactHotLoader/index.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.getElementById('rootWrap');

const renderApp = () => {
  ReactDOM.render(
    <ReactHotLoader>
          <App />
    </ReactHotLoader>,
    rootEl
  );
}


if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

renderApp();