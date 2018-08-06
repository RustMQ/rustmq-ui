import React, { Component } from 'react';
import Button from '../Button/Button';
import './SubscriberListItem.css';

class SubscriberListItem extends Component {
    render() {
        const { subscriber } = this.props;

        return (
            <li className="subscriber-list-item">
                <div>{subscriber.url}</div>
                <Button class="button button--delete"></Button>
            </li>
        );
    }
}

export default SubscriberListItem;
