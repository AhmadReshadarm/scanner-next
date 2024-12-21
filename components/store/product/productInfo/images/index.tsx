import Slider from './Slider';
import { Product } from 'swagger/services';
import { Dispatch, SetStateAction } from 'react';
import styles from '../../styles/images.module.css';

type Props = {
  product?: Product;
  images: string[];
  selectedIndex: number;
  direction: number;
  page: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  paginateImage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<[number, number]>>;
  base64Image: any;
};

const Images: React.FC<Props> = ({
  selectedIndex,
  direction,
  product,
  images,
  page,
  setSelectedIndex,
  paginateImage,
  base64Image,
}) => {
  return (
    <div className={styles.ImagesContainer}>
      <Slider
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        direction={direction}
        page={page}
        paginateImage={paginateImage}
        alt={product?.name}
        base64Image={base64Image}
      />
    </div>
  );
};

export default Images;
