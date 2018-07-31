import React, { Component } from 'react';
import Button from '../Button/Button';
import './NewMessageForm.css'

class NewMessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        event.preventDefault();
    }

    render() {
        return (
                <form className="new-message-form__modal" onSubmit={this.handleSubmit}>
                    <div className="new-message-form__modal__header">Send a New Message</div>
                    <div className="new-message-form__modal__controls">
                        <textarea
                            className="new-message-form__modal__controls__text-area"
                            name="body"
                            placeholder="Your message..."
                            value={this.state.body} 
                            onChange={this.handleInputChange}
                        ></textarea>
                        <div className='new-message-form__modal__control'>
                            <label className='new-message-form__modal__control__label' htmlFor="timeout">Timeout</label>
                            <input className="new-message-form__modal__control__input" id="timeout" type="text" />
                        </div>
                        <div className='new-message-form__modal__control'>
                            <label className='new-message-form__modal__control__label' htmlFor="delay">Delay</label>
                            <input className="new-message-form__modal__control__input" id="delay" type="text" />
                        </div>
                        <div className='new-message-form__modal__control'>
                            <label className='new-message-form__modal__control__label' htmlFor="expiration">Expiration</label>
                            <input className="new-message-form__modal__control__input" id="expiration" type="text" />
                        </div>
                    </div>
                    <div className='new-message-form__modal__buttons'>
                        <Button class='button button--send' label='New Message' />
                    </div>
                </form>
        )
    }
}

export default NewMessageForm;