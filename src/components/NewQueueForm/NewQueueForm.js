import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewQueue } from '../../actions';

class NewQueueForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.props.addNewQueue(this.state).then(() => {
            this.setState({
                toHome: true
            });
        });
        event.preventDefault();
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <p>New Queue</p>
                <form onSubmit={this.handleSubmit} className="ui form">
                    <div className="three wide inline required field">
                        <label htmlFor="queueName">
                            Name:
                        </label>
                        <input id="queueName" name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};

export default connect(mapStateToProps, {addNewQueue})(NewQueueForm);
