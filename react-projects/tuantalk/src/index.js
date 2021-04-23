import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@babel/polyfill";
import Provider from "react-redux/es/components/Provider";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
