import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListItem extends Component {
  render() {
    return (
      <li>
        <Link to={`/queue/${this.props.queue.id}`}>
          [Size: {this.props.queue.size}] {this.props.queue.name} ({
            this.props.queue.type
          })
        </Link>
      </li>
    );
  }
}

export default ListItem;
