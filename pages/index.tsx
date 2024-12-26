import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchScanners, removeScanner } from 'redux/slicers/scannerSlicer';
import { TScanner } from 'redux/types';
import styles from '../components/store/homePage/styles/main.module.css';
import CodeDecoder from 'components/store/homePage/CodeDecoder';
import { Button, Modal } from 'antd';
import Pagination from 'antd/es/pagination';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AppDispatch } from 'redux/store';
// ---------------------------------------------------------------------------------------
const IndexPage = () => {
  const [isClient, setClient] = useState(false);
  const dispatch = useAppDispatch();
  const { scanners, length, loading } = useAppSelector<TScanner>(
    (state) => state.scanner,
  );

  useEffect(() => {
    dispatch(fetchScanners({ limit: 12, offset: 0 }));

    setClient(true);
  }, []);

  const [visible, setVisible] = useState(false);
  const showOrDontModal = () => {
    setVisible(!visible);
  };

  const handleDelete =
    (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
      setVisible(!visible);
      dispatch(removeScanner({ id }));
    };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]: [number, any] = useState(12);
  const handlePageChange = (
    page: number,
    pageSize: number,
    current: number,
    dispatch: AppDispatch,
  ) => {
    setPageSize(pageSize);
    setCurrentPage(current);
    dispatch(fetchScanners({ limit: pageSize, offset: page }));
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <div className={styles.CodesWrapper}>
            <div className={styles.scannerWrapper}>
              {isClient && <CodeDecoder />}
            </div>

            {loading ? (
              <>loading...</>
            ) : (
              <div className={styles.scannerDataWrapper}>
                <div className={styles.itemWrapper}>
                  <p>ID</p>
                  <p>|</p>
                  <p>QR-код</p>
                  <p>|</p>
                  <p>Штрих-код</p>
                </div>
                {scanners.map((scans, index) => {
                  return (
                    <div key={index} className={styles.itemWrapper}>
                      <p>{scans.id}</p>
                      <p>|</p>
                      <p>{scans.qrCode}</p>
                      <p>|</p>
                      <p>{scans.barCode}</p>
                      <div className={styles.actionButtonsWrapper}>
                        <Button
                          type="default"
                          shape="circle"
                          icon={<DeleteOutlined />}
                          onClick={showOrDontModal}
                        />
                        <Button
                          type="default"
                          shape="circle"
                          icon={<EditOutlined />}
                          style={{ marginLeft: '10px' }}
                          // onClick={
                          // }
                        />
                        <Modal
                          title="Подтвердите действие."
                          open={visible}
                          onOk={handleDelete(scans.id!, dispatch, setVisible)}
                          // confirmLoading={isLoading}
                          onCancel={showOrDontModal}
                        >
                          <p>Вы уверены, что хотите удалить {scans.id}?</p>
                        </Modal>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
    </div>
  );
};

// IndexPage.PageLayout = StoreLayout;
export default IndexPage;
