import React, { Component } from "react";
import ListItem from '../ListItem/ListItem';

const queueItems = [
  {id: 1, name: "Test pull"},
  {id: 2, name: "Test unicast"},
  {id: 3, name: "Test multicast"}
];

class QueueList extends Component {

  renderListItem(listItem) {
    return <ListItem key={listItem.id}
                     value={listItem.name} />
  }

  render() {
    const listItems = queueItems.map((item) => this.renderListItem(item));

    return <ul>{listItems}</ul>;
  }
}

export default QueueList;
