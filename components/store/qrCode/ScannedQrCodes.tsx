import { useEffect, useRef, useState } from 'react';
import styles from './scannedQrCode.module.css';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TScanner } from 'redux/types';
import { fetchScanners } from 'redux/slicers/scannerSlicer';
import { useScreenshot } from 'use-react-screenshot';
import Pagination from 'antd/es/pagination';
import { AppDispatch } from 'redux/store';

const ScannedQrcodeScanned = () => {
  const dispatch = useAppDispatch();
  const { scanners, length, loading } = useAppSelector<TScanner>(
    (state) => state.scanner,
  );

  useEffect(() => {
    dispatch(fetchScanners({ limit: 12, offset: 0 }));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(12);
  const PAGE_ITEMS_LIMIT = 12;
  const handlePageChange = (
    page: number,
    pageSize: number,
    current: number,
    dispatch: AppDispatch,
  ) => {
    setPageSize(pageSize);
    setCurrentPage(current);
    dispatch(
      fetchScanners({
        limit: pageSize,
        offset: Number(pageSize ?? PAGE_ITEMS_LIMIT) * (Number(page ?? 1) - 1),
      }),
    );
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

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

        <button onClick={getImage}>Получить изображение QR-кода</button>
        <img
          style={{ border: '1px solid', padding: '10px', borderRadius: '5px' }}
          src={image}
          alt="Нет данных"
        />
      </>
    );
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <a href="/">
            <button>Перейти к сканеру</button>
          </a>
          <div className={styles.scannerDataWrapper}>
            {!loading ? (
              scanners.map((data, index) => {
                return (
                  <div key={index} className={styles.codeContainer}>
                    <Cards data={data} />
                  </div>
                );
              })
            ) : (
              <>loading...</>
            )}
          </div>
          <Pagination
            style={{ marginTop: '20px' }}
            defaultCurrent={currentPage}
            current={currentPage}
            total={length}
            pageSize={pageSize}
            pageSizeOptions={[12, 24, 36, 50, 100]}
            onChange={(current, pageSize) => {
              handlePageChange(current, pageSize, current, dispatch);
            }}
            locale={{ items_per_page: '/ странице' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScannedQrcodeScanned;
