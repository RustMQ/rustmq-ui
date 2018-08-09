import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { setQueueConfig } from '../../actions';
import './QueueTypeSelector.css';


const QUEUE_TYPE = {
    pull: 'pull',
    unicast: 'unicast',
    multicast: 'multicast'
};

class QueueTypeSelector extends Component {
    constructor(props) {
        super(props);

        this.handleNext = this.handleNext.bind(this);
    }


    componentDidMount() {
        const { type, name } = this.props.queueCreationProps.queue;
        this.form.queueType.value = QUEUE_TYPE[type];
        this.form.queueName = name;
    }
    
    handleNext(event) {
        const { queueName, queueType } = this.form;
        this.props.setQueueConfig('SET_CONFIG', { name: queueName.value, type: queueType.value })
        event.preventDefault();
    }

    render() {
        const { className, name } = this.props;

        return (
            <form ref={form => this.form = form} onSubmit={this.handleNext}>
                <div className="queue-type-selector">
                    <div className={className}>
                        <div className="queue-type-selector__controls">
                            <div className="queue-type-selector__controls__control">
                                <input className="queue-type-selector__controls__radio" type="radio" name={name} id="pull" value="pull" />
                                <label className="queue-type-selector__controls__label" htmlFor="pull">Pull</label>
                            </div>
                            <div className="queue-type-selector__controls__control">
                                <input className="queue-type-selector__controls__radio" type="radio" name={name} id="unicast" value="unicast" />
                                <label className="queue-type-selector__controls__label" htmlFor="unicast">Unicast</label>
                            </div>
                            <div className="queue-type-selector__controls__control">
                                <input className="queue-type-selector__controls__radio" type="radio" name={name} id="multicast" value="multicast" />
                                <label className="queue-type-selector__controls__label" htmlFor="multicast">Multicast</label>
                            </div>
                        </div>
                    </div>
                    <div className="queue-type-selector__control">
                        <input required className="queue-type-selector__control__input queue-type-selector__control__input--single" placeholder="Enter Queue Name" id="queueName" name="queueName" type="text" />
                    </div>
                    <div className="queue-type-selector__buttons--centered">
                        <Button label="Next" class="button button--send queue-type-selector__buttons__button--next" />
                    </div>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { queueCreationProps } = state.appStore;
    return {
        queueCreationProps
    }
};

export default connect(mapStateToProps, { setQueueConfig })(QueueTypeSelector);