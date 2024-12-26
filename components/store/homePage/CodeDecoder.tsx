// @ts-nocheck
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { openErrorNotification } from 'common/helpers';
import { useAppDispatch } from 'redux/hooks';
import { createScanner, fetchScanners } from 'redux/slicers/scannerSlicer';
import styles from './styles/main.module.css';
const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  {
    ssr: false,
  },
);
const Scanner = dynamic(() =>
  import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
);

const CodeDecoder = () => {
  const dispatch = useAppDispatch();

  const [qrData, setQrData] = useState('-');
  const [barData, setBarData] = useState('-');

  const [cameraOpenQr, setCameraOpenQr] = useState(false);
  const [cameraOpenBar, setCameraOpenBar] = useState(false);
  const [isQrDetected, setIsQrDetected] = useState(false);
  const [qrCodeLocation, setQrCodeLocation] = useState({
    x: 'auto',
    y: 'auto',
    width: 250,
    height: 250,
  });
  const handleScanQrButtonClick = () => {
    if (cameraOpenBar) {
      openErrorNotification('Сначала закройте камеру для штрих-кода.');
      return;
    }
    setCameraOpenQr(!cameraOpenQr);
  };

  const handleScanBarButtonClick = () => {
    if (cameraOpenQr) {
      openErrorNotification('Сначала закройте камеру для QR-кода.');
      return;
    }
    setCameraOpenBar(!cameraOpenBar);
  };

  const handleScanUpload = () => {
    if (qrData !== '-' && barData !== '-') {
      dispatch(createScanner({ id: '', qrCode: qrData, barCode: barData }));
      setQrData('-');
      setBarData('-');
      dispatch(fetchScanners({ limit: 12, offset: 0 }));
    } else {
      openErrorNotification('Сканировать QR-код и штрих-код');
    }
  };

  const handleError = (error) => {
    console.error(error);
  };
  useEffect(() => {
    console.log(qrCodeLocation);
  }, [qrCodeLocation]);
  return (
    <div className="App">
      <h1>Сканер QR-кода и штрих-кода</h1>

      <div id="btn-container">
        <button onClick={handleScanQrButtonClick}>
          {cameraOpenQr ? 'Остановить сканирование' : 'Сканировать QR-код'}
        </button>

        <button onClick={handleScanBarButtonClick}>
          {cameraOpenBar ? 'Остановить сканирование' : 'Сканировать штрих-код'}
        </button>
      </div>

      <div className={styles.cameraWrapper}>
        <div
          style={{
            // top: qrCodeLocation.y,
            // left: qrCodeLocation.x,
            width: `${qrCodeLocation.width}px`,
            height: `${qrCodeLocation.height}px`,
            display: cameraOpenQr ? 'flex' : 'none',
          }}
          className={styles.qr_code_highlight}
        />
        {cameraOpenQr && (
          // <BarcodeScannerComponent
          //   id="camera-view"
          //   width={300}
          //   height={300}
          //   onUpdate={(err, result) => {
          //     if (result) {
          //       setQrData(result.text);
          //       setCameraOpenQr(false);
          //     } else {
          //       setQrData('-');
          //     }
          //   }}
          // />

          <Scanner
            onScan={(result) => {
              if (result) {
                setQrCodeLocation(result[0].boundingBox);
                setQrData(result[0].rawValue);
                // setCameraOpenQr(false);
              } else {
                setQrData('-');
                setQrCodeLocation({
                  x: 'auto',
                  y: 'auto',
                  width: 250,
                  height: 250,
                });
              }
            }}
            onError={handleError}
            constraints={{
              facingMode: 'environment', // Use the rear camera
              width: { min: 1, max: 1000 }, // Adjust min/max width based on desired QR code size
              height: { min: 1, max: 1000 }, // Adjust min/max height based on desired QR code size
            }}
          />
        )}
        {cameraOpenBar && (
          <BarcodeScannerComponent
            id="camera-view"
            width={300}
            height={300}
            onUpdate={(err, result) => {
              if (result) {
                setBarData(result.text);
                setCameraOpenBar(false);
              } else {
                setBarData('-');
              }
            }}
          />
          // <Scanner

          //   onScan={(result) => {
          //     if (result) {
          //       setBarData(result[0].rawValue);
          //       setCameraOpenBar(false);
          //     } else {
          //       setBarData('-');
          //     }
          //   }}
          // />
        )}
      </div>
      <div className={styles.scannedCodesWrapper}>
        <div className={styles.qrCodeScannerWrapper}>
          <p>QR-код: </p>
          <p>{qrData}</p>
        </div>
        <div className={styles.barCodeScannerWrapper}>
          <p>Штрих-код: </p>
          <p>{barData}</p>
        </div>
      </div>
      <div id="btn-container">
        <button
          style={{
            backgroundColor:
              qrData !== '-' && barData !== '-' ? '#007bff' : '#575757',
          }}
          onClick={handleScanUpload}
        >
          Сохранить файл
        </button>
      </div>
    </div>
  );
};

export default CodeDecoder;
