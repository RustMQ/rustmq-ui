import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { loadQueue, removeQueue, loadMessages } from '../actions'
import MessageList from '../components/MessageList/MessageList';
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
                    <MessageList items={messages}/>
                </div>
                <div className="queue-page__container_queue__container">
                    <div>
                        <h2>[Size: {queue.size}] {queue.name} ({ queue.type })</h2>
                    </div>
                    <input type="button" value="Delete a Queue" onClick={this.handleDeleteQueue} />
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
