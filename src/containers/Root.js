import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import App from './App';
import Queue from './Queue';

const Root = ({ store }) => (
    <Provider store={store}>
        <div className="Root">
            <Route path="/" exact component={App} />
            <Route path="/queue/:queueName" exact component={Queue} />
        </div>
    </Provider>
);

export default Root;
