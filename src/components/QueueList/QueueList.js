import React, { Component } from 'react';
import QueueListItem from '../QueueListItem/QueueListItem';
import './QueueList.css';

class QueueList extends Component {
  renderListItem(key, value) {
    return <QueueListItem key={key} queue={value} />;
  }

  render() {
    const listItems = this.props.items.map(
      item => this.renderListItem(item[0], item[1])
    );

    return (
      <ul className='queue-list'>
        <div className='queue-list__header'>My Queues</div>
        {listItems}
      </ul>
    );
  }
}

export default QueueList;
