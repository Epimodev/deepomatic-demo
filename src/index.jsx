import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const appContainer = document.getElementById('app');
const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    appContainer,
  );
};

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
