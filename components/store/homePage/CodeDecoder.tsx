// @ts-nocheck
import React, { useState } from 'react';
import jsQR from 'jsqr';
import dynamic from 'next/dynamic';
const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  {
    ssr: false, // Disable server-side rendering
  },
);

const CodeDecoder = () => {
  const [loadingScan, setLoadingScan] = useState(false);

  const [data, setData] = useState('');

  const [error, setError] = useState('');

  const [qrFile, setQrFile] = useState(null);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [scannedDataHistory, setScannedDataHistory]: [any, any] = useState([]);

  const handleError = (err) => {
    console.error(err);

    setError(
      'Error accessing the camera. Please make sure the camera is accessible.',
    );

    setLoadingScan(false);
  };

  const handleBrowseButtonClick = () => {
    if (qrFile) {
      setQrFile(null);
    } else {
      document.getElementById('qrFileInput')!.click();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setQrFile(file);

      scanQRFromFile(file);
    }
  };

  const scanQRFromFile = (file) => {
    setLoadingScan(true);

    setError('');

    const reader = new FileReader();

    reader.onload = async (event) => {
      const qrData = event.target!.result;

      try {
        const result: any = await scanQRCodeFromData(qrData);

        if (result) {
          setData(result);

          // Add scanned data to history

          setScannedDataHistory([...scannedDataHistory, result]);
        } else {
          setError('На выбранном изображении не найден QR-код или штрихкод.');
        }
      } catch (err: any) {
        setError('Ошибка сканирования QR-кода или штрих-кода: ' + err.message);
      }

      setLoadingScan(false);
    };

    reader.readAsDataURL(file);
  };

  const scanQRCodeFromData = (qrData) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = qrData;

      img.onload = () => {
        const canvas = document.createElement('canvas');

        const ctx: any = canvas.getContext('2d');

        canvas.width = img.width;

        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        try {
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            resolve(code.data);
          } else {
            reject(new Error('QR-код или штрих-код не найдены'));
          }
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleScanButtonClick = () => {
    setCameraOpen(!cameraOpen);
  };

  return (
    <div className="App">
      <h1>Сканер QR-кода и штрих-кода</h1>

      <div id="btn-container">
        <button onClick={handleScanButtonClick}>
          {cameraOpen
            ? 'Остановить сканирование'
            : 'Сканировать QR-код/штрих-код'}
        </button>

        <button onClick={handleBrowseButtonClick}>
          {qrFile ? 'Остановить просмотр' : 'Просмотреть QR-код/штрихкод'}
        </button>
      </div>

      <div id="camera-container">
        {cameraOpen && (
          <BarcodeScannerComponent
            id="camera-view"
            width={300}
            height={300}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);

                // Add scanned data to history

                setScannedDataHistory([...scannedDataHistory, result.text]);
              } else {
                setData('Не найдено');
              }
            }}
          />
        )}
      </div>

      <div className="data">
        {loadingScan && <p>Загрузка...</p>}

        {error && <p>Error: {error}</p>}

        <input
          type="file"
          id="qrFileInput"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        {qrFile && (
          <div>
            <p>Выбранное изображение:</p>

            <img src={URL.createObjectURL(qrFile)} alt="QRCode" />
          </div>
        )}
      </div>

      <div>
        {/* <h2>Scanned Data History</h2> */}

        <p>Данные: {data}</p>

        <ul>
          {scannedDataHistory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CodeDecoder;
