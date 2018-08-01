import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return (
            <button onClick={this.props.onClick} className={this.props.class}>
                <span className='button__label'>
                    {this.props.label}
                </span>
            </button>
        )
    }
}

export default Button;