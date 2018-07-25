import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import App from './App';
import Queue from './Queue';
import NewQueueForm from '../components/NewQueueForm/NewQueueForm';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Root.css';

const Root = ({ store }) => (
    <Provider store={store}>
        <div className="root">
            <Header />
            <main className="root__main">
                <Route path="/" exact component={App} />
                <Route path="/queue/:queueName" exact component={Queue} />
                <Route path="/queues/new" exact component={NewQueueForm} />
            </main>
            <Footer />
        </div>
    </Provider>
);

export default Root;
