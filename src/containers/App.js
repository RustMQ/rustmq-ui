import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QueueList from '../components/QueueList/QueueList';
import { loadQueues } from '../actions';
import Header from '../components/Header/Header';

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
        const { items, isFetching } = this.props;
        return (
            <div className='App'>
                <Header />
                <div className='App-newQueue'>
                    <input type="button" value="Create a New Queue" onClick={this.handleNewQueueCall} />
                </div>
                <div className='App-queueList'>
                    {
                        !isFetching && <QueueList items={items} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        isFetching
    } = state.appStore;

    return {
        items: Array.from(queues),
        isFetching: isFetching
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueues
    })(App)
);