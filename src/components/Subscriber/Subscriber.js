import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import './Subscriber.css';

class Subscriber extends Component {

    renderHeaderListItem(key, value) {
        return (
            <div key={key} className="subscriber__controls__control__header">
                <div>{key}: {value}</div>
                <Button class="button button--delete"></Button>
            </div>
        )
    }

    render() {
        const { name, url, headers } = this.props.modalProps.subscriber;

        const headersList = headers.map(header => {
            return this.renderHeaderListItem(header.key, header.value);
        })

        return (
            <div className="subscriber">
                <Button onClick={this.handleClose} class="button button--close new-queue-form__close-button" />
                <div className="subscriber__header">
                    Subscriber
                </div>
                <form className="subscriber__controls">
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label" htmlFor="name">Name</label>
                        <input className="subscriber__controls__control__input" defaultValue={name} placeholder="Subscriber name" id="name" name="name" type="text" />
                    </div>
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label" htmlFor="url">URL</label>
                        <input className="subscriber__controls__control__input" defaultValue={url} placeholder="http://example.com" id="url" name="url" type="text" />
                    </div>
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label">Headers</label>
                        <div className="subscriber__controls__control__headers">
                            {headersList}
                            <div className="subscriber__controls__control__headers__input-group">
                                <input className="subscriber__controls__control__input" placeholder="e.g. Content-Type" type="text" />
                                <input className="subscriber__controls__control__input" placeholder="e.g. application/json" type="text" />
                                <Button class="button button--add"></Button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="subscriber__controls__control__buttons">
                    <Button label="Add" class="button button--send" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        modalType,
        modalProps
    } = state.appStore;

    return {
        modalType,
        modalProps
    }
};

export default connect(mapStateToProps, {})(Subscriber);