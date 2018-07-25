import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={this.props.class}>{this.props.label}</button>
        )
    }
}

export default Button;