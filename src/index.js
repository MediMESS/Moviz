import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import {onProfileStatusChange} from './containers/App/AppReducers.js';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const rootReducer = combineReducers({onProfileStatusChange});
const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(
                <Provider store={store}>
                  <App />
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
