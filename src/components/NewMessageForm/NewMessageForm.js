import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal, postMessage, loadQueue } from '../../actions';
import Button from '../Button/Button';
import './NewMessageForm.css'

class NewMessageForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { body, timeout, delay, expiration } = this.form;
        const { queueName } = this.props;
        //TODO introduce default message constructor
        const message = {
            body: body.value,
            timeout: parseInt(timeout.value, 10),
            delay: parseInt(delay.value, 10),
            expiration: parseInt(expiration.value, 10)
        };
        await this.props.postMessage(queueName, message);
        await this.props.loadQueue(queueName);
        this.props.hideModal();
    }

    handleClose() {
        this.props.hideModal();
    }

    render() {
        return (
            <div className="new-message-form__modal">
                <Button onClick={this.handleClose} class="button button--close new-message-form__modal__close-button" />
                <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                    <div className="new-message-form__modal__header">Send a New Message</div>
                    <div className="new-message-form__modal__controls">
                        <textarea
                            className="new-message-form__modal__controls__text-area"
                            name="body"
                            placeholder="Your message..."
                            required
                        ></textarea>
                        <div className="new-message-form__modal__control">
                            <label className="new-message-form__modal__control__label" htmlFor="timeout">Timeout</label>
                            <input className="new-message-form__modal__control__input" onChange={this.validate} placeholder="60 sec by default" id="timeout" name="timeout" min="0" type="number" />
                        </div>
                        <div className="new-message-form__modal__control">
                            <label className="new-message-form__modal__control__label" htmlFor="delay">Delay</label>
                            <input className="new-message-form__modal__control__input" placeholder="0 sec by default" id="delay" name="delay" min="0" type="number" />
                        </div>
                        <div className="new-message-form__modal__control">
                            <label className="new-message-form__modal__control__label" htmlFor="expiration">Expiration</label>
                            <input className="new-message-form__modal__control__input" placeholder="604,800 sec (7 days) by default" id="expiration" min="0" name="expiration" type="number" />
                        </div>
                    </div>
                    <div className="new-message-form__modal__buttons">
                        <Button class="button button--send" label="New Message" />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { queueName } = state.appStore.modalProps;
    return {
        queueName
    }
};

export default connect(mapStateToProps, { hideModal, postMessage, loadQueue })(NewMessageForm);
