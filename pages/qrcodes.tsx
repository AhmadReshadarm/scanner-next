import ScannedQrcodeScanned from 'components/store/qrCode/ScannedQrCodes';
import { useEffect, useState } from 'react';

const QrCode = () => {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return <>{isClient ? <ScannedQrcodeScanned /> : ''}</>;
};

export default QrCode;
