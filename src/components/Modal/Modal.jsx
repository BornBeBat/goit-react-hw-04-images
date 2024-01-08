import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      this.props.onClick();
    }
  };
  render() {
    const { largeImg, tags } = this.props.info;
    return createPortal(
      <div className={s.overlay} onClick={this.handleClick}>
        <div className={s.modal}>
          <img src={largeImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
