import { Image } from 'antd';
import { imageFallback } from 'common/constants';
import { useAppSelector } from 'redux/hooks';
import styles from './index.module.scss';

const AdvertisementImage = () => {
  const advertisement = useAppSelector((state) => state.banners.advertisement);

  return (
    <>
      <a href={'https://' + advertisement[0]?.link}>
        <Image
          className={styles.bannersTab__advertisementImageContainer__image}
          preview={false}
          src={`/api/images/${advertisement[0]?.image}`}
          fallback={imageFallback}
        />
      </a>
    </>
  );
};

export default AdvertisementImage;
