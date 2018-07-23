import React, { Component } from "react";
import QueueListItem from "../QueueListItem/QueueListItem";

class QueueList extends Component {
  renderListItem(listItem) {
    return <QueueListItem key={listItem.name} queue={listItem} />;
  }

  render() {
    const listItems = this.props.items.map(item => this.renderListItem(item));

    return <ul>{listItems}</ul>;
  }
}

export default QueueList;
