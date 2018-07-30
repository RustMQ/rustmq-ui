import React, { Component } from 'react';
import MessageListItem from '../MessageListItem/MessageListItem';
import './MessageList.css';

class MessageList extends Component {
    renderListItem(message) {
        return <MessageListItem key={message.id} message={message} />;
    }

    render() {
        const listItems = this.props.items.map(
            item => this.renderListItem(item)
        );

        return (
            <ul className='message-list'>
                <div className='message-list__header'>Messages</div>
                {listItems}
            </ul>
        )
    }
}

export default MessageList;
