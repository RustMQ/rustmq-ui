import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { hideModal, updateSubscriberModalProps, updateSubscribers, loadQueue } from '../../actions';
import './Subscriber.css';

class Subscriber extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRemoveHeader = this.handleRemoveHeader.bind(this);
        this.handleAddHeader = this.handleAddHeader.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, url } = this.form;
        const { queueName } = this.props.modalProps;
        const { headers } = this.props.modalProps.subscriber;

        const subscriber = {
            name: name.value,
            url: url.value,
            headers: headers
        }

        this.props.updateSubscriberModalProps(subscriber);

        const updatedHeaders = {};
        headers.forEach(header => {
            updatedHeaders[header.key] = header.value;
        });

        this.props.updateSubscribers(queueName, [{ ...subscriber, headers: updatedHeaders}]).then(() => {
            this.props.loadQueue(queueName).then(() => {
                this.props.hideModal();
            })
        })
    }

    handleClose() {
        this.props.hideModal();
    }

    handleAddHeader(event) {
        event.preventDefault();

        const { subscriber } = this.props.modalProps;
        const { headerKey, headerValue } = this.form;

        const updatedHeaders = subscriber.headers.concat([]);

        const header = {
            key: headerKey.value,
            value: headerValue.value
        }

        updatedHeaders.push(header);

        this.props.updateSubscriberModalProps({ ...subscriber, headers: updatedHeaders});
        headerKey.value = '';
        headerValue.value = '';
    }

    handleRemoveHeader(key) {
        const { subscriber } = this.props.modalProps;

        const updatedHeaders = subscriber.headers.filter(header => header.key !== key);
        this.props.updateSubscriberModalProps({ ...subscriber, headers: updatedHeaders});
    }

    renderHeaderListItem(key, value) {
        return (
            <div key={key} className="subscriber__controls__control__header">
                <div>{key}: {value}</div>
                <Button onClick={() => this.handleRemoveHeader(key)} class="button button--delete"></Button>
            </div>
        )
    }

    render() {
        const { modalType } = this.props;
        const { name, url, headers } = this.props.modalProps.subscriber;
        const type = (modalType === 'UPDATE_SUBSCRIBER') ? 'Update' : 'Add';

        const headersList = headers.map(header => {
            return this.renderHeaderListItem(header.key, header.value);
        })

        return (
            <div className="subscriber">
                <Button onClick={this.handleClose} class="button button--close new-queue-form__close-button" />
                <div className="subscriber__header">
                    {type} Subscriber
                </div>
                <form ref={form => this.form = form} onSubmit={this.handleSubmit} className="subscriber__controls">
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label" htmlFor="name">Name</label>
                        <input className="subscriber__controls__control__input" disabled={modalType === 'UPDATE_SUBSCRIBER'} defaultValue={name} placeholder="Subscriber name" id="name" name="name" type="text" />
                    </div>
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label" htmlFor="url">URL</label>
                        <input className="subscriber__controls__control__input" disabled={modalType === 'UPDATE_SUBSCRIBER'} defaultValue={url} placeholder="http://example.com" id="url" name="url" type="text" />
                    </div>
                    <div className="subscriber__controls__control">
                        <label className="subscriber__controls__control__label">Headers</label>
                        <div className="subscriber__controls__control__headers">
                            {headersList}
                            <div className="subscriber__controls__control__headers__input-group">
                                <input className="subscriber__controls__control__input" id="headerKey" name="headerKey" placeholder="e.g. Content-Type" type="text" />
                                <input className="subscriber__controls__control__input" id="headerValue" name="headerValue" placeholder="e.g. application/json" type="text" />
                                <Button onClick={this.handleAddHeader} class="button button--add"></Button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="subscriber__controls__control__buttons">
                    <Button onClick={this.handleSubmit} label={type} class="button button--send" />
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

export default connect(mapStateToProps, { hideModal, updateSubscriberModalProps, updateSubscribers, loadQueue })(Subscriber);