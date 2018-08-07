import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { showUpdateSubscriberModal } from '../../actions';
import './SubscriberListItem.css';

class SubscriberListItem extends Component {
    constructor(props) {
        super(props);

        this.handleUpdateSubscriber = this.handleUpdateSubscriber.bind(this);
    }

    handleUpdateSubscriber() {
        const { queueName, subscriber } = this.props;
        this.props.showUpdateSubscriberModal(queueName, subscriber);
    }

    render() {
        const { subscriber } = this.props;

        return (
            <li className="subscriber-list-item">
                <a onClick={this.handleUpdateSubscriber}>{subscriber.url}</a>
                <Button class="button button--delete"></Button>
            </li>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, { showUpdateSubscriberModal })(SubscriberListItem);
