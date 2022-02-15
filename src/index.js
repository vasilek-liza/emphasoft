import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
