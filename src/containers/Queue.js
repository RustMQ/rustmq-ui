import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { loadQueue, removeQueue, loadMessages } from '../actions'
import MessageList from '../components/MessageList/MessageList';
import SubscriberList from '../components/SubscriberList/SubscriberList'
import Button from '../components/Button/Button'
import './Queue.css';

const loadData = async ({ loadQueue, loadMessages, match, deleted }) => {
    if (deleted === true) {
        return;
    }

    await loadQueue(match.params.queueName);
    await loadMessages(match.params.queueName);
}
class Queue extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteQueue = this.handleDeleteQueue.bind(this);
    }

    componentDidMount() {
        loadData(this.props);
    }

    handleDeleteQueue() {
        const { queue } = this.props;

        this.props.removeQueue(queue.name);
    }

    render() {
        const { queue, messages, isFetching, toHome } = this.props;

        if (toHome === true) {
            return <Redirect to='/' />
        }

        if (isFetching) {
            return null
        }

        return (
            <div className="queue-page__container">
                <div className="queue-page__container__message-list">
                    <MessageList items={messages} />
                </div>
                <div className="queue-page__container__queue__info">
                    <div className="queue-page__container__queue__container">
                        <div className="queue-page__container__queue__header">
                            {queue.name}
                        </div>
                        <div className="queue-page__container__queue__item">
                            Type: {queue.type}
                        </div>
                        <div className="queue-page__container__queue__item">
                            Size: {queue.size}
                        </div>
                        <div className="queue-page__container__queue__item">
                            Total messages: {queue.total_messages}
                        </div>
                        <div className="queue-page__container__queue__controls">
                            <Button label="Delete a Queue" onClick={this.handleDeleteQueue} class="button button--send"></Button>
                        </div>
                    </div>
                    {queue.type !== 'pull' && <div className="queue-page__container__queue__container">
                        <div className="queue-page__container__queue__header">
                            Push Information
                        </div>
                        <div className="queue-page__container__queue__item">
                            Retries: {queue.push.retries}
                        </div>
                        <div className="queue-page__container__queue__item">
                            Retries Delay: {queue.push.retries_delay}
                        </div>
                        <div className="queue-page__container__queue__item">
                            Error Queue: {queue.push.error_queue}
                        </div>
                        <div className="queue-page__container__queue__item">
                            Subscribers:
                        <SubscriberList subscribers={queue.push.subscribers} />
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        messages,
        isFetching,
        deleted,
        toHome
    } = state.appStore;

    const queue = queues.get(ownProps.match.params.queueName);

    return {
        queue,
        messages,
        isFetching,
        deleted,
        toHome
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueue,
        removeQueue,
        loadMessages
    })(Queue)
);
