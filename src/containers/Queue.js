import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import {
    loadQueue,
    removeQueue,
    loadMessages,
    deleteMessage,
    removeSubscribers,
    clearQueue,
    showNewSubscriberModal,
    showUpdateSubscriberModal,
    showDeleteQueueDialog,
    showClearQueueDialog,
    hideModal
} from '../actions'
import MessageList from '../components/MessageList/MessageList';
import SubscriberList from '../components/SubscriberList/SubscriberList'
import Subscriber from '../components/Subscriber/Subscriber';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog'
import Button from '../components/Button/Button'
import './Queue.css';

const loadData = async ({ loadQueue, loadMessages, match, deleted }) => {

    await loadQueue(match.params.queueName);
    await loadMessages(match.params.queueName);
}
class Queue extends Component {
    constructor(props) {
        super(props);

        this.showDeleteDialog = this.showDeleteDialog.bind(this);
        this.showClearDialog = this.showClearDialog.bind(this);
        this.handleDeleteQueue = this.handleDeleteQueue.bind(this);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
        this.handleDeleteSubscriber = this.handleDeleteSubscriber.bind(this);
        this.handleAddSubscriber = this.handleAddSubscriber.bind(this);
        this.handleClearMessages = this.handleClearMessages.bind(this);
    }

    componentDidMount() {
        loadData(this.props);
    }

    async handleDeleteQueue() {
        const { queue } = this.props;

        await this.props.removeQueue(queue.name);
        this.props.hideModal();
    }

    showDeleteDialog() {
        this.props.showDeleteQueueDialog();
    }

    showClearDialog() {
        this.props.showClearQueueDialog();
    }

    handleAddSubscriber() {
        const { queue } = this.props;
        this.props.showNewSubscriberModal(queue.name);
    }

    async handleDeleteSubscriber() {
        const { queue, hideModal } = this.props;
        const { subscriber } = this.props.modalProps;
        await this.props.removeSubscribers(queue.name, [subscriber]);
        await this.props.loadQueue(queue.name);
        hideModal();
    }

    async handleDeleteMessage() {
        const { deleteMessage, loadQueue, hideModal } = this.props;
        const { message } = this.props.modalProps;
        await deleteMessage(message.queueName, message.id);
        await loadQueue(message.queueName);
        hideModal();
    }

    async handleClearMessages() {
        const { queue, clearQueue, loadQueue, loadMessages, hideModal } = this.props;
        await clearQueue(queue.name);
        await loadQueue(queue.name);
        await loadMessages(queue.name);
        hideModal();
    }

    renderModalContent(modalType) {
        
        switch (modalType) {
            case 'UPDATE_SUBSCRIBER':
            case 'NEW_SUBSCRIBER':
                return (<Subscriber />);
            case 'DELETE_QUEUE':
                const { queue } = this.props;
                return (
                    <ConfirmationDialog
                        title="Are you sure?"
                        message={`"${queue.name}" will be deleted`}
                        handleConfirm={this.handleDeleteQueue}
                    />
                )
            case 'DELETE_MESSAGE':
                return (
                    <ConfirmationDialog
                        title="Are you sure?"
                        message={`Message will be deleted`}
                        handleConfirm={this.handleDeleteMessage}
                    />
                )
            case 'CLEAR_QUEUE':
                return (
                    <ConfirmationDialog
                        title="Are you sure?"
                        message={`All messages will be deleted`}
                        handleConfirm={this.handleClearMessages}
                    />
                )
            case 'DELETE_SUBSCRIBER':
                const { subscriber } = this.props.modalProps;
                return (
                    <ConfirmationDialog
                        title="Are you sure?"
                        message={`"${subscriber.url}" will be deleted`}
                        handleConfirm={this.handleDeleteSubscriber}
                    />
                )
            default:
                return null;
        }
    }

    render() {
        const {
            queue,
            messages,
            isFetching,
            toHome,
            modalIsOpen,
            modalType
        } = this.props;

        if (toHome === true) {
            return <Redirect to='/' />
        }

        if (isFetching && messages.length === 0) {
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
                            <Button label="Clear a Queue" onClick={this.showClearDialog} class="button button--send"></Button>
                            <Button label="Delete a Queue" onClick={this.showDeleteDialog} id="deleteQueue" class="button button--send"></Button>
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
                            <SubscriberList queueName={queue.name} subscribers={queue.push.subscribers} />
                        </div>
                        <div className="queue-page__container__queue__controls">
                            <Button label="Add new Subscriber" onClick={this.handleAddSubscriber} class="button button--send"></Button>
                        </div>
                    </div>}
                </div>
                <ReactModal
                    isOpen={modalIsOpen}
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    {this.renderModalContent(modalType)}
                </ReactModal>
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
        toHome,
        modal
    } = state.appStore;

    const queue = queues.get(ownProps.match.params.queueName);

    return {
        queue,
        messages,
        isFetching,
        deleted,
        toHome,
        modalIsOpen: modal.isOpen,
        modalType: modal.type,
        modalProps: modal.props,
        hideModal
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueue,
        removeQueue,
        loadMessages,
        deleteMessage,
        clearQueue,
        removeSubscribers,
        showNewSubscriberModal,
        showUpdateSubscriberModal,
        showDeleteQueueDialog,
        showClearQueueDialog,
        hideModal
    })(Queue)
);
