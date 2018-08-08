import React, { Component } from 'react';
import { connect } from 'react-redux';
import QueueTypeSelector from './QueueTypeSelector';
import { addNewQueue, loadQueues, hideModal } from '../../actions';
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
        const { timeout, expiration, retries, retries_delay, subscriber } = this.form;
        const { queue } = this.props.queueCreationProps;

        const q = {
            name: queue.name,
            type: queue.type,
            timeout: parseInt(timeout.value),
            expiration_time: parseInt(expiration.value)
        }

        if(queue.type !== 'pull') {
            const push = {
                retries: parseInt(retries.value),
                retries_delay: parseInt(retries_delay.value),
                subscribers: [{name: subscriber.value, url: subscriber.value}]
            }

            q['push'] = push;
        }

        console.log(q);

        this.props.addNewQueue(q).then(() => {
            this.props.loadQueues().then(() => this.props.hideModal());
        });   
    }

    handleClose() {
        this.props.hideModal();
    }

    render() {
        const { step, queue } = this.props.queueCreationProps;

        return (
            <div className="new-queue-form">
                <Button onClick={this.handleClose} class="button button--close new-queue-form__close-button" />
                <div className="new-queue-form__header">Create New Queue</div>
                {step === 'SELECT_TYPE' && (<QueueTypeSelector name="queueType" className="new-queue-form__controls__type-selector" />)}
                {step === 'SET_CONFIG' && (
                    <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                        <div className="new-queue-form__controls">
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
                            {queue.type !== 'pull' && (
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
                                        <input className="new-queue-form__control__input" placeholder="http://example.com" id="subscriber" name="subscriber" type="text" required/>
                                    </div>
                                </div>
                            )}
                            <div className="new-message-form__modal__buttons">
                                <Button label="Create" class="button button--send" />
                            </div>
                        </div>
                    </form>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { queueCreationProps } = state.appStore;
    return {
        queueCreationProps
    }
};

export default connect(mapStateToProps, { addNewQueue, loadQueues, hideModal })(NewQueueForm);
