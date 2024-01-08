import { ImageGalleryItem } from 'components/ImageGalleryItem';
import s from './ImageGallery.module.scss';

export const ImageGallery = ({ data, onClick }) => {
  return (
    <ul className={s.gallery}>
      {data.map(({ webformatURL, largeImageURL, tags }, id) => {
        return (
          <ImageGalleryItem
            key={id}
            img={webformatURL}
            largeImg={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};
