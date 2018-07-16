import React, { Component } from "react";
import ListItem from "../ListItem/ListItem";

const queueItems = [
  { id: 1, name: "Test pull", type: "pull", size: 38 },
  { id: 2, name: "Test unicast", type: "unicast", size: 122 },
  { id: 3, name: "Test multicast", type: "multicast", size: 9999 }
];

class QueueList extends Component {
  renderListItem(listItem) {
    return <ListItem key={listItem.id} queue={listItem} />;
  }

  render() {
    const listItems = queueItems.map(item => this.renderListItem(item));

    return <ul>{listItems}</ul>;
  }
}

export default QueueList;
