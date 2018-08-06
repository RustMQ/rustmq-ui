import React, { Component } from 'react';

class SubscriberList extends Component {
    
    render() {
        const { subscribers } = this.props;

        const listItems = subscribers.map((s) => {
            return <li>{s.url}</li>;
        })

        return (
            <ul>
                {listItems}
            </ul>
        )
    }
}

export default SubscriberList;