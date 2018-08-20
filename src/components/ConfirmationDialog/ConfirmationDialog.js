import React, { Component } from 'react'
import { connect } from 'react-redux';
import { hideModal } from '../../actions';
import Button from '../Button/Button';
import './ConfirmationDialog.css';

class ConfirmationDialog extends Component {
    render() {
        return (
            <div className="confirmation-dialog">
                <div className="confirmation-dialog__title">{this.props.title}</div>
                <div>{this.props.message}</div>
                <div className="confirmation-dialog__controls">
                    <Button id="confirm" onClick={this.props.handleConfirm} class="button button--send confirmation-dialog__controls__button"  label="Ok" />
                    <Button id="cancel" onClick={() => this.props.hideModal()} class="button button--send confirmation-dialog__controls__button" label="Cancel" />
                </div>
            </div>
        )
    }
}

export default connect(null, { hideModal })(ConfirmationDialog);
