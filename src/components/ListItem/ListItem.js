import React, { Component } from "react";

class ListItem extends Component {
    render() {
        return (
            <li>{this.props.value}</li>
        )
    }
}

export default ListItem;
