import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return (
            <button onClick={this.props.onClick} className={this.props.class}>{this.props.label}</button>
        )
    }
}

export default Button;