// import { Image } from 'antd';
import Image from 'antd/es/image';

type PropsFullScreen = {
  zoomImgSrc?: string;
};

const ZoomFullScreen: React.FC<PropsFullScreen> = ({ zoomImgSrc }) => {
  return (
    <>
      <Image
        className="hidden-image-zoom"
        style={{ display: 'none' }}
        width={200}
        preview={{ src: zoomImgSrc }}
      />
    </>
  );
};

export default ZoomFullScreen;
