import React, { Component } from 'react';
import Button from '../Button/Button';
import './MessageListItem.css';

class MessageListItem extends Component {
    render() {
        return (
            <li className="message-list-item">
                <div className="message-list-item__status">
                    Unreserved
                </div>
                <div className="message-list-item__body">
                    {this.props.message.body}
                </div>
                <div className="message-list-item__controls">
                    <Button label='Delete' class='button button--delete'></Button>
                </div>
            </li>
        )
    }
}

export default MessageListItem;
