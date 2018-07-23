import React, { Component } from "react";
import { Link } from "react-router-dom";

class QueueListItem extends Component {
  render() {
    return (
      <li>
        <Link to={`/queue/${this.props.queue.name}`}>
          [Size: {this.props.queue.size}] {this.props.queue.name} ({
            this.props.queue.type
          })
        </Link>
      </li>
    );
  }
}

export default QueueListItem;
