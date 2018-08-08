import React, { Component } from 'react';
import './QueueTypeSelector.css';

class QueueTypeSelector extends Component {
    render() {
        const { className, name } = this.props;

        return (
            <div className={`queue-type-selector ${className}`}>
                <div className="queue-type-selector__controls">
                    <div className="queue-type-selector__controls__control">
                        <input className="queue-type-selector__controls__radio" type="radio" name={name} id="pull" value="pull"/>
                        <label className="queue-type-selector__controls__label" htmlFor="pull">Pull</label>
                    </div>
                    <div className="queue-type-selector__controls__control">
                        <input className="queue-type-selector__controls__radio" type="radio" name={name} id="unicast" value="unicast" />
                        <label className="queue-type-selector__controls__label" htmlFor="unicast">Unicast</label>
                    </div>
                    <div className="queue-type-selector__controls__control">
                        <input className="queue-type-selector__controls__radio" type="radio" name={name} id="multicast" value="multicast"/>
                        <label className="queue-type-selector__controls__label" htmlFor="multicast">Multicast</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default QueueTypeSelector;