// @ts-nocheck
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { openErrorNotification } from 'common/helpers';
import { useAppDispatch } from 'redux/hooks';
import { createScanner, fetchScanners } from 'redux/slicers/scannerSlicer';
import styles from './styles/main.module.css';
// const BarcodeScannerComponent = dynamic(
//   () => import('react-qr-barcode-scanner'),
//   {
//     ssr: false, // Disable server-side rendering
//   },
// );
// import { Scanner } from '@yudiel/react-qr-scanner';
const Scanner = dynamic(() =>
  import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
);

const boundingBox = dynamic(() =>
  import('@yudiel/react-qr-scanner').then((mod) => mod.boundingBox),
);

const CodeDecoder = () => {
  const dispatch = useAppDispatch();

  const [qrData, setQrData] = useState('-');
  const [barData, setBarData] = useState('-');

  const [cameraOpenQr, setCameraOpenQr] = useState(false);
  const [cameraOpenBar, setCameraOpenBar] = useState(false);

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

      <div className={styles.cameraWrapper} id="camera-container">
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
                setQrData(result[0].rawValue);
                setCameraOpenQr(false);
              } else {
                setQrData('-');
              }
            }}
          />
        )}
        {cameraOpenBar && (
          // <BarcodeScannerComponent
          //   id="camera-view"
          //   width={300}
          //   height={300}
          //   onUpdate={(err, result) => {
          //     if (result) {
          //       setBarData(result.text);
          //       setCameraOpenBar(false);
          //     } else {
          //       setBarData('-');
          //     }
          //   }}
          // />
          <Scanner
            onScan={(result) => {
              if (result) {
                setBarData(result[0].rawValue);
                setCameraOpenBar(false);
              } else {
                setBarData('-');
              }
            }}
          />
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
