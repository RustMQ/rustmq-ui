import React, { Component } from 'react';
import './SubscriberList.css'
import SubscriberListItem from '../SubscriberListItem/SubscriberListItem';

class SubscriberList extends Component {

    render() {
        const { subscribers, queueName } = this.props;

        const listItems = subscribers.map((subscriber, index) => {
            return <SubscriberListItem key={index} queueName={queueName} subscriber={subscriber} />;
        });

        return (
            <ul className="subscriber-list">
                {listItems}
            </ul>
        )
    }
}

export default SubscriberList;
