import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
        <div className="Root">
            <Route path="/" component={App} />
        </div>
    </Provider>
);

export default Root;
