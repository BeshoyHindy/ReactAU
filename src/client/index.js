import ReactHotLoader from '../shared/components/ReactHotLoader/index';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/App';

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
  module.hot.accept('../shared/App', () => {
    renderApp();
  });
}

renderApp();