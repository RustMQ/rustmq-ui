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
        const { queue } = this.props;
        return (
            <div>
                { !queue.isFetching && <h2>[Size: {queue.size}] {queue.name} ({ queue.type })</h2> }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queue,
        isFetching
    } = state;

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
