import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import './firebase'

import './index.scss';
import App from './App';
import store, {persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";


ReactDOM.render(
      <Router>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
          </Provider>
      </Router>,
  document.getElementById('root')
);