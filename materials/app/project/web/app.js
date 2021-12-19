import 'stylesheets/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'components/router';

ReactDOM.render(
  <AppContainer>
    <Router />
  </AppContainer>,
  document.querySelector('.app')
);