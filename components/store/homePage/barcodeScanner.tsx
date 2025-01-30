import { useEffect, useRef, useState } from 'react';

interface DetectedBarcode {
  format: string;
  rawValue: string;
  cornerPoints: Array<{ x: number; y: number }>;
}

// Declare BarcodeDetector interface
declare global {
  interface Window {
    BarcodeDetector: {
      new (options?: { formats: string[] }): any;
      detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
    };
  }
}

const BarcodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<'environment' | 'user'>(
    'environment',
  );
  const detectionInterval = useRef<NodeJS.Timeout>();
  const isMounted = useRef(true);

  const getCameraStream = async () => {
    const constraints = {
      video: {
        facingMode: cameraType,
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    };

    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.error('Camera error:', error);
      return null;
    }
  };

  const drawBarcodeBox = (barcode: DetectedBarcode) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const displayWidth = video.offsetWidth;
    const displayHeight = video.offsetHeight;

    const scaleX = displayWidth / videoWidth;
    const scaleY = displayHeight / videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (barcode.cornerPoints?.length >= 4) {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.rect(
        barcode.cornerPoints[0].x * scaleX,
        barcode.cornerPoints[0].y * scaleY,
        (barcode.cornerPoints[2].x - barcode.cornerPoints[0].x) * scaleX,
        (barcode.cornerPoints[2].y - barcode.cornerPoints[0].y) * scaleY,
      );
      ctx.stroke();
    }
  };

  const startScanning = async () => {
    const stream = await getCameraStream();
    if (!stream) return;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    if (!('BarcodeDetector' in window)) {
      alert('Barcode Detection API not supported');
      return;
    }

    const detector = new window.BarcodeDetector({
      formats: ['qr_code', 'ean_13', 'code_128'],
    });

    detectionInterval.current = setInterval(async () => {
      if (
        !videoRef.current ||
        videoRef.current.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA
      ) {
        return;
      }

      try {
        const barcodes = await detector.detect(videoRef.current);
        if (barcodes.length > 0) {
          const detected = barcodes[0];
          drawBarcodeBox(detected);
          clearInterval(detectionInterval.current);
          stream.getTracks().forEach((track) => track.stop());
          setDetectedBarcode(detected.rawValue);
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
      clearInterval(detectionInterval.current);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current && videoRef.current) {
        canvasRef.current.width = videoRef.current.offsetWidth;
        canvasRef.current.height = videoRef.current.offsetHeight;
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
      {!detectedBarcode ? (
        <div>
          <div style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: 'auto' }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '30%',
                border: '2px solid rgba(0, 255, 0, 0.5)',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button onClick={startScanning}>Start Scanning</button>
            <button
              onClick={() =>
                setCameraType((prev) =>
                  prev === 'environment' ? 'user' : 'environment',
                )
              }
            >
              Switch Camera ({cameraType === 'environment' ? 'Front' : 'Back'})
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Detected Barcode:</h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {detectedBarcode}
          </p>
          <button
            onClick={() => setDetectedBarcode(null)}
            style={{ marginTop: '1rem' }}
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
