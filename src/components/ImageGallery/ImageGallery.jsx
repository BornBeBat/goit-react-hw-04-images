import { ImageGalleryItem } from 'components';
import s from './ImageGallery.module.scss';

export const ImageGallery = ({ data, onClick }) => {
  return (
    <ul className={s.gallery}>
      {data.map(({ urls, alt_description }, id) => {
        return (
          <ImageGalleryItem
            key={id}
            img={urls.small}
            largeImg={urls.regular}
            tags={alt_description}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};
