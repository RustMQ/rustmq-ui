import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { showUpdateSubscriberModal, removeSubscribers, loadQueue } from '../../actions';
import './SubscriberListItem.css';

class SubscriberListItem extends Component {
    constructor(props) {
        super(props);

        this.handleUpdateSubscriber = this.handleUpdateSubscriber.bind(this);
        this.handleDeleteSubscriber = this.handleDeleteSubscriber.bind(this);
    }

    handleUpdateSubscriber() {
        const { queueName, subscriber } = this.props;
        this.props.showUpdateSubscriberModal(queueName, subscriber);
    }

    async handleDeleteSubscriber() {
        const { queueName, subscriber } = this.props;
        await this.props.removeSubscribers(queueName, [subscriber]);
        await this.props.loadQueue(queueName);
    }

    render() {
        const { subscriber } = this.props;

        return (
            <li className="subscriber-list-item">
                <a onClick={this.handleUpdateSubscriber}>{subscriber.url}</a>
                <Button onClick={this.handleDeleteSubscriber} class="button button--delete"></Button>
            </li>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, { showUpdateSubscriberModal, removeSubscribers, loadQueue })(SubscriberListItem);
