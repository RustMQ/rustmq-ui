import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadQueue } from '../actions'

const loadData = ({ loadQueue, match }) => {
    loadQueue(match.params.queueName);
}
class Queue extends Component {

    componentDidMount() {
        loadData(this.props);
    }

    render() {
        const { queue, isFetching } = this.props;
        return (
            <div>
                { !isFetching && <h2>[Size: {queue.size}] {queue.name} ({ queue.type })</h2> }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        isFetching
    } = state.appStore;

    const queue = queues.find(queue => {
        return queue.name === ownProps.match.params.queueName
    });

    return {
        queue,
        isFetching: isFetching
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueue
    })(Queue)
);
