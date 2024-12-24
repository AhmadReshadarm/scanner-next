import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchScanners } from 'redux/slicers/scannerSlicer';
import { TScanner } from 'redux/types';
import styles from '../components/store/homePage/styles/main.module.css';
import CodeDecoder from 'components/store/homePage/CodeDecoder';
// ---------------------------------------------------------------------------------------
const IndexPage = () => {
  const [isClient, setClient] = useState(false);
  const dispatch = useAppDispatch();
  const { scanners, length, loading } = useAppSelector<TScanner>(
    (state) => state.scanner,
  );

  // const [data, setData] = useState('No result');
  useEffect(() => {
    dispatch(fetchScanners());

    setClient(true);
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <div className={styles.CodesWrapper}>
            <div className={styles.scannerWrapper}>
              {/* <p>{data}</p> */}
              {isClient ? <CodeDecoder /> : ''}
            </div>

            {loading ? (
              <>loading...</>
            ) : (
              scanners.map((scans, index) => {
                return (
                  <div key={index} className={styles.itemWrapper}>
                    <p>{scans.id}</p>
                    <p>|</p>
                    <p>{scans.qrCode}</p>
                    <p>|</p>
                    <p>{scans.barCode}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// IndexPage.PageLayout = StoreLayout;
export default IndexPage;
