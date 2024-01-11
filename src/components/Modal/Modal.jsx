import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ info, onClick }) => {
  /**
   * Effect
   */
  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClick]);
  /**
   * Functions
   */

  const handleClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      onClick();
    }
  };

  /**
   * Destructuring prop "info"
   */
  const { largeImg, tags } = info;

  return createPortal(
    <div className={s.overlay} onClick={handleClick}>
      <div className={s.modal}>
        <img className={s.image} src={largeImg} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};
