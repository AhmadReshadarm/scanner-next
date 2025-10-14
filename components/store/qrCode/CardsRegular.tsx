import { useRef } from 'react';
import styles from './scannedQrCode.module.css';
import { useScreenshot } from 'use-react-screenshot';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

const Cards = ({ data }) => {
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
            {data.qrCode?.split('code=')[1]}
          </p>
        </div>
        <div className={styles.barcodNumberWrapper}>
          <Barcode
            value={`${data.barCode}`}
            height={40}
            width={1.8}
            margin={0}
            displayValue={false}
            background="#9D9D99"
          />
          <div className={styles.numbersWrapper}>
            {data.barCode?.split('').map((numbers, index) => {
              return <p key={index}>{numbers}</p>;
            })}
          </div>
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

export default Cards;
