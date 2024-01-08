import s from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = ({ img, largeImg, tags, onClick }) => {
  return (
    <li onClick={() => onClick({ largeImg, tags })} className={s.item}>
      <img className={s.image} src={img} alt={tags} />
    </li>
  );
};
