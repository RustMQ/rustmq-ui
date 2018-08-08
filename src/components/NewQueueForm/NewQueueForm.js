import React, { Component } from 'react';
import { connect } from 'react-redux';
import QueueTypeSelector from './QueueTypeSelector';
import { addNewQueue, loadQueues , hideModal } from '../../actions';
import Button from '../Button/Button';
import './NewQueueForm.css';

const QUEUE_TYPE = {
    pull: 'pull',
    unicast: 'unicast',
    multicast: 'multicast'
};

class NewQueueForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.form.queueType.value = QUEUE_TYPE.pull;
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
                <div className="new-queue-form__header">Create New Queue</div>
                <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                    <div className="new-queue-form__controls">
                        <QueueTypeSelector name="queueType" className="new-queue-form__controls__type-selector" />
                        <div className="new-queue-form__control">
                            <input className="new-queue-form__control__input new-queue-form__control__input--single" placeholder="Enter Queue Name" id="queueName" name="queueName" type="text"/>
                        </div>
                        <div className="new-queue-form__buttons--centered">
                            <Button label="Next" class="button button--send new-queue-form__buttons__button--next" />
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
