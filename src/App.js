import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  Responsive,
  Segment
} from 'semantic-ui-react';
import './App.css';
import QueueList from './components/QueueList/QueueList';

const year = (new Date()).getFullYear();

class App extends Component {
  render() {
    return (
      <Router>
        <div className='body'>
          <div className='header'>
            <h1>RustMQ</h1>
          </div>
          <Route exact path="/">
            <div className='content'>
              <Responsive>
                <div className="queue-list">
                  <QueueList />
                </div>
              </Responsive>
            </div>
          </Route>
          <div className='footer'>
            <Responsive>
              <Segment textAlign='center'>
                (c) { year }
              </Segment>
            </Responsive>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
