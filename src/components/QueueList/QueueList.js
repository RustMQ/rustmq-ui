import React, { Component } from "react";
import ListItem from "../QueueListItem/QueueListItem";

class QueueList extends Component {
  renderListItem(listItem) {
    return <ListItem key={listItem.id} queue={listItem} />;
  }

  render() {
    const listItems = this.props.items.map(item => this.renderListItem(item));

    return <ul>{listItems}</ul>;
  }
}

export default QueueList;
