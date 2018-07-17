import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import '../node_modules/semantic-ui-css/semantic.min.css';

const store = createStore(combineReducers({
    // TODO: add reducers
}));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
