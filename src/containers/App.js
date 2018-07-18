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
        const { items } = this.props;
        return (
            <div className='App-queueList'>
                <QueueList items={items} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        entities: { queues }
    } = state;

    const items = Object.values(queues);

    return {
        items: items
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueues
    })(App)
);