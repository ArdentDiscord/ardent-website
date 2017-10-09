import React from 'react';
import { render } from 'react-dom';
// import { Provider } from "react-redux"
// import store from "./redux/store";
import BrowserRouter from 'react-router-dom/BrowserRouter';
import AppContainer from 'react-hot-loader/lib/AppContainer';

import App from './containers/App/App';

const renderApp = Component => {
  render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/App/App.js', () => {
    const HotApp = import('./containers/App/App.js').default;
    render(HotApp);
  });
}

renderApp(App);
