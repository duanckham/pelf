import 'stylesheets/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import IndexComponent from 'src/index';

ReactDOM.render(
  <AppContainer>
    <IndexComponent />
  </AppContainer>,
  document.querySelector('.app')
);