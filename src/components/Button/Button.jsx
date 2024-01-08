import s from './Button.module.scss';

export const Button = ({ onClick }) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};
