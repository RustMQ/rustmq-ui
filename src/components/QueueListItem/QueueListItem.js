import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { showPostMessageModal } from '../../actions';
import './QueueListItem.css';

class QueueListItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.showPostMessageModal(this.props.queue.name);
  }

  render() {
    return (
      <li className='queue-list-item'>
        <Link className='queue-list-item__link' to={`/queue/${this.props.queue.name}`}>
          <div className='queue-list-item__link__info'>
            <div className='queue-list-item__link__info__size'>
              <span className='queue-list-item__link__info__size__label'>{this.props.queue.size}</span>
            </div>
            <div className='queue-list-item__link__info__type'>
              {this.props.queue.type}
            </div>
          </div>
          <div className='queue-list-item__link__name'>
            {this.props.queue.name}
          </div>
        </Link>
        <div className='queue-list-item__controls'> 
          <Button onClick={this.handleClick} label='New Message' class='button button--send button--send--icon'></Button>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(mapStateToProps, {showPostMessageModal})(QueueListItem);
