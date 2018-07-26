import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './QueueListItem.css';

class QueueListItem extends Component {
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
          <div>
            {this.props.queue.name}
          </div>
          <div>
            <Button label='New Message' class='button'></Button>
          </div>
        </Link>
      </li>
    );
  }
}

export default QueueListItem;
