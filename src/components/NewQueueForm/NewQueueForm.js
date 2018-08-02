import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewQueue, hideModal } from '../../actions';
import Button from '../Button/Button';
import './NewQueueForm.css';

class NewQueueForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.props.addNewQueue(this.state).then(() => {
            this.props.hideModal();
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
                <form onSubmit={this.handleSubmit} className="ui form">
                    <div className="new-queue-form__controls">
                        <div className="new-queue-form__control">
                            <label className="new-queue-form__control__label" htmlFor="queueName">Name:</label>
                            <input className="new-queue-form__control__input" placeholder="Enter Queue Name" id="queueName" name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
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

export default connect(mapStateToProps, { addNewQueue, hideModal })(NewQueueForm);
