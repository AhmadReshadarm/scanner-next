import { useRef } from 'react';
import styles from './ScannedQRCodeSpecial.module.css';
import { useScreenshot } from 'use-react-screenshot';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

const CardsSpecial = ({ data }) => {
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  return (
    <>
      <div ref={ref} className={styles.barAndQrCodeWrapper}>
        <div className={styles.fullCodeWrapper}>
          <div className={styles.qrWrapper}>
            <QRCode
              style={{
                height: 'auto',
                maxWidth: '100%',
                width: '100%',
              }}
              bgColor="#9D9D99"
              value={`${data.qrCode}`}
            />
          </div>
          <p className={styles.qrCodeNumber}>
            Wakavaping.com/ <br />
            pages/verify
          </p>
        </div>
        <div className={styles.barcodNumberWrapper}>
          <p>
            {data.barCode.slice(0, 7)} <br /> {data.barCode.slice(7, 14)}
            {/* -
            {data.barCode} */}
          </p>
        </div>
      </div>

      <button className="image_generation_btn" onClick={getImage}>
        Получить изображение QR-кода
      </button>
      <img
        style={{ border: '1px solid', padding: '10px', borderRadius: '5px' }}
        src={image}
        alt="Нет данных"
      />
    </>
  );
};

export default CardsSpecial;
