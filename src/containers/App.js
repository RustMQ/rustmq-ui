import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import QueueList from '../components/QueueList/QueueList';
import Button from '../components/Button/Button';
import { loadQueues } from '../actions';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm'
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

    handleNewQueueCall(event) {
        this.props.history.push('/queues/new');
        event.preventDefault();
    }

    render() {
        const { items, isFetching, modalType } = this.props;

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
                <ReactModal isOpen = {modalType === 'POST_MESSAGE'} className='modal' overlayClassName="modal-overlay"><NewMessageForm /></ReactModal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        isFetching,
        modalType
    } = state.appStore;

    return {
        items: Array.from(queues),
        isFetching: isFetching,
        modalType: modalType
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueues
    })(App)
);