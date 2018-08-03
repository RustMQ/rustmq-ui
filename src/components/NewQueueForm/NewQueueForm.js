import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewQueue, loadQueues , hideModal } from '../../actions';
import Button from '../Button/Button';
import './NewQueueForm.css';

class NewQueueForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(event) {
        const { queueName } = this.form;
        this.props.addNewQueue({ name: queueName.value }).then(() => {
            this.props.loadQueues().then(() => this.props.hideModal());
        });
        event.preventDefault();
    }

    handleClose() {
        this.props.hideModal();
    }

    render() {

        return (
            <div className="new-queue-form">
                <Button onClick={this.handleClose} class="button button--close new-queue-form__close-button" />
                <div className="new-queue-form__header">New Queue</div>
                <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                    <div className="new-queue-form__controls">
                        <div className="new-queue-form__control">
                            <label className="new-queue-form__control__label" htmlFor="queueName">Name:</label>
                            <input className="new-queue-form__control__input" placeholder="Enter Queue Name" id="queueName" name="queueName" type="text"/>
                        </div>
                        <div className="new-queue-form__control">
                            <label className="new-queue-form__control__label" htmlFor="queueType">Type:</label>
                            <select className="new-queue-form__control__select" name="queueType">
                                <option>Pull</option>
                                <option>Unicast</option>
                                <option>Multicast</option>
                            </select>
                        </div>
                        <div className="new-message-form__modal__buttons">
                            <Button label="Create" class="button button--send" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, { addNewQueue, loadQueues, hideModal })(NewQueueForm);
