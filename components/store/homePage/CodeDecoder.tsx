// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { openErrorNotification } from 'common/helpers';
import { useAppDispatch } from 'redux/hooks';
import { createScanner, fetchScanners } from 'redux/slicers/scannerSlicer';
import styles from './styles/main.module.css';
import { Tag } from 'swagger/services';
const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  {
    ssr: false,
  },
);
const Scanner = dynamic(() =>
  import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
);
type Props = {
  tags: Tag[];
  selectedDatabase: string;
  setSelectedDatabase: any;
};
const CodeDecoder: React.FC<Props> = ({
  tags,
  selectedDatabase,
  setSelectedDatabase,
}) => {
  const dispatch = useAppDispatch();

  const [qrData, setQrData] = useState('');
  const [barData, setBarData] = useState('');
  const [byScanner, setByScanner] = useState(false);

  const [cameraOpenQr, setCameraOpenQr] = useState(false);
  const [cameraOpenBar, setCameraOpenBar] = useState(false);
  const [isQrDetected, setIsQrDetected] = useState(false);
  const [qrCodeLocation, setQrCodeLocation] = useState({
    x: 'auto',
    y: 'auto',
    width: 200,
    height: 200,
  });
  const cameraWrapperRef = useRef(null);
  const handleScanQrButtonClick = () => {
    if (cameraOpenBar) {
      openErrorNotification('Сначала закройте камеру для штрих-кода.');
      return;
    }
    setCameraOpenQr(!cameraOpenQr);
    setIsQrDetected(false);
  };

  const handleScanBarButtonClick = () => {
    if (cameraOpenQr) {
      openErrorNotification('Сначала закройте камеру для QR-кода.');
      return;
    }
    setCameraOpenBar(!cameraOpenBar);
  };

  const handleByScannerButtonClick = () => {
    setByScanner(!byScanner);
  };

  const handleScanUpload = () => {
    if (qrData !== '' && barData !== '' && selectedDatabase !== '') {
      const isSaved: any = dispatch(
        createScanner({
          id: '',
          qrCode: qrData,
          barCode: barData,
          tags: [selectedDatabase],
        }),
      );
      if (!isSaved.error) {
        setQrData('');
        setBarData('');
        dispatch(fetchScanners({ limit: 12, offset: 0, tags: [tags[0].url] }));
      }
    } else {
      openErrorNotification('Сканировать QR-код и штрих-код');
    }
  };

  const handleError = (error) => {
    console.error(error);
  };
  const nextInput = useRef(null);

  return (
    <div className={styles.ScannerContainer}>
      <h1>Сканер QR-кода и штрих-кода</h1>

      <div id="btn-container">
        {byScanner ? (
          ''
        ) : (
          <>
            {' '}
            <button onClick={handleScanQrButtonClick}>
              {cameraOpenQr ? 'Остановить сканирование' : 'Сканировать QR-код'}
            </button>
            <button onClick={handleScanBarButtonClick}>
              {cameraOpenBar
                ? 'Остановить сканирование'
                : 'Сканировать штрих-код'}
            </button>
          </>
        )}
        <button onClick={handleByScannerButtonClick}>
          {byScanner ? 'Использовать камеру' : 'Использовать сканер'}
        </button>
        <a href="/qrcodes">
          <button>Перейти к QR-кодам</button>
        </a>
        <a href="/create-tag">
          <button>Создать новую базу данных</button>
        </a>
      </div>

      {byScanner ? (
        <>
          <div className={styles.byScannerWrapper}>
            <input
              className={styles.formInputs}
              type="text"
              placeholder="QR-код"
              value={qrData}
              onChange={(evt) => {
                setQrData(evt.target.value);
                const barValue = evt.target.value.slice(39, 49);
                setBarData(barValue);
              }}
              onKeyDown={(evt) => {
                if (evt.key === 'Enter' && nextInput.current) {
                  nextInput.current.focus();
                }
              }}
            />
            <input
              ref={nextInput}
              className={styles.formInputs}
              placeholder="штрих-код"
              type="text"
              value={barData}
              onChange={(evt) => setBarData(evt.target.value)}
            />
          </div>
        </>
      ) : (
        <div className={styles.cameraWrapper} ref={cameraWrapperRef}>
          <p
            style={{
              width: `${qrCodeLocation.width}px`,
              height: `${qrCodeLocation.height}px`,
              display: isQrDetected ? 'flex' : 'none',
            }}
            className={styles.qr_code_highlight}
          />
          {cameraOpenQr && (
            <Scanner
              allowMultiple={true}
              onScan={(result) => {
                if (result) {
                  setIsQrDetected(true);
                  const { x, y, width, height } = result[0].boundingBox;
                  setQrCodeLocation({ x, y, width, height });
                  setQrData(result[0].rawValue);

                  setTimeout(() => {
                    setCameraOpenQr(false);
                    setIsQrDetected(false);
                  }, 2000);
                } else {
                  setQrData('');
                  setIsQrDetected(true);
                  setQrCodeLocation({
                    x: 'auto',
                    y: 'auto',
                    width: 200,
                    height: 200,
                  });
                }
              }}
              onError={handleError}
              constraints={{
                facingMode: 'environment',
                advanced: [{ focuseMode: 'continuous' }, { zoom: '1.5' }],
                width: { min: 1, max: 1000 },
                height: { min: 1, max: 1000 },
              }}
            />
          )}
          {cameraOpenBar && (
            <BarcodeScannerComponent
              id="camera-view"
              videoConstraints={{
                facingMode: 'enviroment',
                advanced: [{ focuseMode: 'continuous' }, { zoom: '1.5' }],
              }}
              width={300}
              height={300}
              onUpdate={(err, result) => {
                if (result) {
                  setBarData(result.text);
                  setCameraOpenBar(false);
                } else {
                  setBarData('');
                }
              }}
            />
          )}
        </div>
      )}
      <div className={styles.scannedCodesWrapper}>
        <div className={styles.options_container}>
          <h1>Выберите базу данных для сохранения данных</h1>
          <select
            className={styles.option_wrapper}
            onChange={(evt) => {
              setSelectedDatabase(evt.target.value);
            }}
          >
            {tags.map((tag) => {
              return <option value={tag.id}>{tag.name}</option>;
            })}
          </select>
        </div>
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
              qrData !== '' && barData !== '' ? '#007bff' : '#575757',
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
