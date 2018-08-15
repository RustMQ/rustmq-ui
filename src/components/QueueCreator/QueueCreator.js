import React, { Component } from 'react';
import { connect } from 'react-redux';
import QueueTypeSelector from '../../components/QueueTypeSelector/QueueTypeSelector';
import NewQueueForm from '../../components/NewQueueForm/NewQueueForm';
import { addNewQueue, loadQueues, hideModal } from '../../actions';
import Button from '../Button/Button';
import './QueueCreator.css';

class QueueCreator extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.hideModal();
    }

    render() {
        const { step, queue } = this.props.queueCreationProps;

        return (
            <div className="queue-creator">
                <Button onClick={this.handleClose} class="button button--close queue-creator__close-button" />
                {step !== 'SUCCESS_CREATE' && (<div className="queue-creator__header">Create New Queue</div>)}
                {step === 'SELECT_TYPE' && (<QueueTypeSelector name="queueType" className="queue-creator__controls__type-selector" />)}
                {step === 'SET_CONFIG' && (<NewQueueForm />)}
                {step === 'SUCCESS_CREATE' && (
                    <div className="queue-creator__success">
                        <div className="queue-creator__queue-name">{queue.type} Queue Created</div>
                    </div>
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

export default connect(mapStateToProps, { addNewQueue, loadQueues, hideModal })(QueueCreator);
