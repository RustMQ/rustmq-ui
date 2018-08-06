import React, { Component } from 'react';
import './SubscriberList.css'

class SubscriberList extends Component {

    render() {
        const { subscribers } = this.props;

        const listItems = subscribers.map((s, index) => {
            return <li key={index}>{s.url}</li>;
        });

        return (
            <ul className="subscriber-list">
                {listItems}
            </ul>
        )
    }
}

export default SubscriberList;
