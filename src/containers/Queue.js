import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { loadQueue, removeQueue } from '../actions'

const loadData = ({ loadQueue, match, deleted }) => {
    if (deleted === true) {
        return;
    }

    loadQueue(match.params.queueName);
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
        const { queue, isFetching, toHome } = this.props;
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                { !isFetching &&
                    <div>
                        <h2>[Size: {queue.size}] {queue.name} ({ queue.type })</h2>
                        <input type="button" value="Delete a Queue" onClick={this.handleDeleteQueue} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        queues,
        isFetching,
        deleted,
        toHome
    } = state.appStore;

    const queue = queues.get(ownProps.match.params.queueName);

    return {
        queue,
        isFetching,
        deleted,
        toHome
    }
};

export default withRouter(
    connect(mapStateToProps, {
        loadQueue, removeQueue
    })(Queue)
);
