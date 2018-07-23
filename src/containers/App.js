import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QueueList from '../components/QueueList/QueueList';
import { loadQueues } from '../actions';

const loadData = ({ loadQueues }) => {
    loadQueues();
}

class App extends Component {
    componentDidMount() {
        loadData(this.props);
    }

    render() {
        const { items, isFetching } = this.props;
        return (
            <div className='App-queueList'>
                {
                    !isFetching && <QueueList items={items} />
                }
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