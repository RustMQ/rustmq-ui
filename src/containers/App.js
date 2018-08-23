import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import QueueList from '../components/QueueList/QueueList';
import Button from '../components/Button/Button';
import { loadQueues, showNewQueueModal, newQueueConfig } from '../actions';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';
import QueueCreator from '../components/QueueCreator/QueueCreator';
import './App.css';

const loadData = ({ loadQueues }) => {
    loadQueues();
}

class App extends Component {
    constructor(props) {
        super(props);
        this.handleNewQueueCall = this.handleNewQueueCall.bind(this);
    }

    componentDidMount() {
        loadData(this.props);
    }

    handleNewQueueCall() {
        this.props.newQueueConfig();
        this.props.showNewQueueModal();
    }

    render() {
        const { items, isFetching, modalType, modalIsOpen } = this.props;

        return (
            <div className='app__container'>
                <div className='app__container__queue-list'>
                {!(isFetching && items.length === 0) && <QueueList items={items} /> }
                </div>
                <div className='app__container__actions'>
                    <div>
                        <Button label='Create a New Queue' onClick={this.handleNewQueueCall} class='button button--create'></Button>
                    </div>
                </div>
                <ReactModal
                    isOpen={modalIsOpen}
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    {(modalType === "POST_MESSAGE") && <NewMessageForm />}
                    {(modalType === "NEW_QUEUE") && <QueueCreator />}
                </ReactModal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        isFetching,
        modal
    } = state.appStore;

    return {
        items: Array.from(queues),
        isFetching: isFetching,
        modalType: modal.type,
        modalIsOpen: modal.isOpen
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueues,
        showNewQueueModal,
        newQueueConfig
    })(App)
);
