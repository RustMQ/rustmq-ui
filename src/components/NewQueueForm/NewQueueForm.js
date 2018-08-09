import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewQueue, hideModal, loadQueues } from '../../actions';
import Button from '../Button/Button';
import './NewQueueForm.css';

class NewQueueForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { 
            timeout,
            expiration,
            retries,
            retries_delay,
            subscriber
        } = this.form;
        
        const { name, type } = this.props.queueCreationProps.queue;

        const queue = {
            name: name,
            type: type,
            timeout: parseInt(timeout.value, 10),
            expiration_time: parseInt(expiration.value, 10)
        }

        if (type !== 'pull') {
            const push = {
                retries: parseInt(retries.value, 10),
                retries_delay: parseInt(retries_delay.value, 10),
                subscribers: [{ name: subscriber.value, url: subscriber.value }]
            }

            queue['push'] = push;
        }

        this.props.addNewQueue(queue).then(() => {
            this.props.loadQueues().then(() => this.props.hideModal());
        });
    }

    handleClose() {
        this.props.hideModal();
    }

    renderPullConfig() {
        const { queue } = this.props.queueCreationProps;

        return (
            <div>
                <div className="new-queue-form__queue-name">
                    {queue.name}
                </div>
                <div className="new-queue-form__control">
                    <label className="new-queue-form__control__label" htmlFor="timeout">Timeout:</label>
                    <input className="new-queue-form__control__input" placeholder="60 sec by default" id="timeout" name="timeout" type="text" />
                </div>
                <div className="new-queue-form__control">
                    <label className="new-queue-form__control__label" htmlFor="expiration">Expiration:</label>
                    <input className="new-queue-form__control__input" placeholder="604800 sec by default" id="expiration" name="expiration" type="text" />
                </div>
            </div>
        )
    }

    renderPushConfig() {
        return (
            <div>
                <div className="new-queue-form__control">
                    <label className="new-queue-form__control__label" htmlFor="retries">Retries:</label>
                    <input className="new-queue-form__control__input" placeholder="3 by default" id="retries" name="retries" type="text" />
                </div>
                <div className="new-queue-form__control">
                    <label className="new-queue-form__control__label" htmlFor="retries_delay">Retries Delay:</label>
                    <input className="new-queue-form__control__input" placeholder="60 sec by default" id="retries_delay" name="retries_delay" type="text" />
                </div>
                <div className="new-queue-form__control">
                    <label className="new-queue-form__control__label" htmlFor="error_queue">Error Queue:</label>
                    <input className="new-queue-form__control__input" placeholder="Enter error queue name" id="error_queue" name="error_queue" type="text" />
                </div>
                <div className="new-queue-form__control">
                    <label className="new-queue-form__control__label" htmlFor="subscriber">Subscriber:</label>
                    <input className="new-queue-form__control__input" placeholder="http://example.com" id="subscriber" name="subscriber" type="text" required />
                </div>
            </div>
        )
    }

    render() {
        const { queue } = this.props.queueCreationProps;

        return (
            <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                <div className="new-queue-form__controls">
                    {this.renderPullConfig()}
                    {queue.type !== 'pull' && this.renderPushConfig()}
                    <div className="new-message-form__modal__buttons">
                        <Button label="Create" class="button button--send" />
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { queueCreationProps } = state.appStore;
    return {
        queueCreationProps
    }
};

export default connect(mapStateToProps, { addNewQueue, hideModal, loadQueues })(NewQueueForm);
