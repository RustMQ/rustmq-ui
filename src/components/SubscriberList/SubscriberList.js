import React, { Component } from 'react';
import './SubscriberList.css'
import SubscriberListItem from '../SubscriberListItem/SubscriberListItem';

class SubscriberList extends Component {

    render() {
        const { subscribers } = this.props;

        const listItems = subscribers.map((subscriber, index) => {
            return <SubscriberListItem key={index} subscriber={subscriber} />;
        });

        return (
            <ul className="subscriber-list">
                {listItems}
            </ul>
        )
    }
}

export default SubscriberList;
