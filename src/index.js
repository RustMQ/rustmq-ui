import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Root from './containers/Root';
import '../node_modules/semantic-ui-css/semantic.min.css';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
);
