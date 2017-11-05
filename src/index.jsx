import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const appContainer = document.getElementById('app');
const renderApp = () => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    appContainer,
  );
};

renderApp();

if (module.hot) {
  module.hot.accept(renderApp);
}
