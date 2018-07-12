import React, { Component } from 'react';
import { Responsive, Segment } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Segment.Group>
        <Responsive as={Segment}>
          <div>
            <h1>RustMQ</h1>
          </div>
        </Responsive>
      </Segment.Group>
    );
  }
}

export default App;
