import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMessage, loadQueue } from '../../actions';
import Button from '../Button/Button';
import './MessageListItem.css';

const MESSAGE_STATE = {
    reserved: 'reserved',
    unreserved: 'unreserved'
}

class MessageListItem extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const { message, deleteMessage, loadQueue } = this.props;
        deleteMessage(message.queueName, message.id).then(() => {
            loadQueue(message.queueName);
        })
    }

    render() {
        const { message } = this.props;

        return (
            <li className="message-list-item">
                <div className={`message-list-item__status message-list-item__status--${MESSAGE_STATE[message.state]}`}></div>
                <div className="message-list-item__body">
                    {message.body}
                </div>
                {(message.state !== MESSAGE_STATE.reserved) &&
                <div className="message-list-item__controls">
                    <Button onClick={this.handleDelete} class='button button--delete'></Button>
                </div>
                }
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

export default connect(mapStateToProps, {deleteMessage, loadQueue})(MessageListItem);
