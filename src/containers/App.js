import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import QueueList from '../components/QueueList/QueueList';
import Button from '../components/Button/Button';
import { loadQueues, showNewQueueModal } from '../actions';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm'
import NewQueueForm from '../components/NewQueueForm/NewQueueForm'
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
        this.props.showNewQueueModal();
    }

    render() {
        const { items, isFetching, modalType, modalIsOpen } = this.props;

        return (
            <div className='app__container'>
                <div className='app__container__queue-list'>
                    {
                        !isFetching && <QueueList items={items} />
                    }
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
                    {(modalType === "NEW_QUEUE") && <NewQueueForm />}
                </ReactModal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        isFetching,
        modalType,
        modalIsOpen
    } = state.appStore;

    return {
        items: Array.from(queues),
        isFetching: isFetching,
        modalType: modalType,
        modalIsOpen: modalIsOpen
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueues,
        showNewQueueModal
    })(App)
);