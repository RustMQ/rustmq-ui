import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import ReactModal from 'react-modal';
import App from './App';
import Queue from './Queue';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Root.css';

ReactModal.setAppElement('#root');

const Root = ({ store }) => (
    <Provider store={store}>
        <div id="root" className="root">
            <Header />
            <main className="root__main">
                <Route path="/" exact component={App} />
                <Route path="/queue/:queueName" exact component={Queue} />
            </main>
            <Footer />
        </div>
    </Provider>
);

export default Root;
