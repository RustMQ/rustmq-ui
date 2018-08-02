import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions';
import Button from '../Button/Button';
import './MessageListItem.css';

class MessageListItem extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const { message, deleteMessage } = this.props;
        deleteMessage(message.queueName, message.id);
    }

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
                    <Button onClick={this.handleDelete} class='button button--delete'></Button>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

export default connect(mapStateToProps, {deleteMessage})(MessageListItem);
