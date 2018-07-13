import React, { Component } from 'react';
import { Responsive, Segment } from 'semantic-ui-react';
import './App.css';

const year = (new Date()).getFullYear();

class App extends Component {
  render() {
    return (
      <div className='body'>
        <div className='header'>
          <h1>RustMQ</h1>
        </div>
        <div className='content'>
          Comming soon...
        </div>
        <div className='footer'>
          <Responsive>
            <Segment textAlign='center'>
              (c) { year }
            </Segment>
          </Responsive>
        </div>
      </div>
    );
  }
}

export default App;
