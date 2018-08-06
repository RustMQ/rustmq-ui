import React, { Component } from 'react';
import Button from '../Button/Button';
import './Subscriber.css';

class Subscriber extends Component {

    renderHeaderListItem(header) {
        return (
            <div className="subscriber__controls__control__header">
                <div>Content-Type: application/json</div>
                <Button class="button button--delete"></Button>
            </div>
        )
    }

    render() {
        const { subscriber } = this.props;

        return (
            <div className="subscriber">
                <Button onClick={this.handleClose} class="button button--close new-queue-form__close-button" />
                <div className="subscriber__header">
                    Subscriber
                </div>
                <div className="subscriber__controls">
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label" htmlFor="name">Name</label>
                        <input className="subscriber__controls__control__input" placeholder="Subscriber name" id="name" name="name" type="text" />
                    </div>
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label" htmlFor="url">URL</label>
                        <input className="subscriber__controls__control__input" placeholder="http://example.com" id="url" name="url" type="text" />
                    </div>
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label">Headers</label>
                        <div className="subscriber__controls__control__headers">
                            <div className="subscriber__controls__control">
                                <input className="subscriber__controls__control__input" placeholder="e.g. Content-Type" type="text" />
                                <input className="subscriber__controls__control__input" placeholder="e.g. application/json" type="text" />
                                <Button class="button button--add"></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subscriber__controls__control__buttons">
                    <Button label="Add" class="button button--send" />
                </div>
            </div>
        )
    }
}

export default Subscriber