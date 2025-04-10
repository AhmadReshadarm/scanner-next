import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchScanners,
  removeScanner,
  updateScanner,
} from 'redux/slicers/scannerSlicer';
import { TScanner } from 'redux/types';
import styles from '../components/store/homePage/styles/main.module.css';
import CodeDecoder from 'components/store/homePage/CodeDecoder';
import { Button, Modal } from 'antd';
import Pagination from 'antd/es/pagination';
import { DeleteOutlined } from '@ant-design/icons';
import { AppDispatch } from 'redux/store';
import { clearTags, fetchTags } from 'redux/slicers/tagsSlicer';
import { basicRequestParams } from 'common/constants';
import { openErrorNotification } from 'common/helpers';
import { Scanner } from 'swagger/services';
// ---------------------------------------------------------------------------------------
const IndexPage = () => {
  const [isClient, setClient] = useState(false);

  const dispatch = useAppDispatch();
  const { scanners, length, loading } = useAppSelector<TScanner>(
    (state) => state.scanner,
  );
  const tags = useAppSelector((state) => state.tags.tags);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedDatabaseURL, setSelectedDatabaseURL] = useState('');
  useEffect(() => {
    dispatch(fetchTags(basicRequestParams));
    setClient(true);
    return () => {
      dispatch(clearTags());
    };
  }, []);

  useEffect(() => {
    if (tags.length !== 0) {
      setSelectedDatabase(tags[0].url);
      setSelectedDatabaseURL(tags[0].url);
      dispatch(fetchScanners({ limit: 12, offset: 0, tags: [tags[0].url] }));
    }
  }, [tags]);

  const [visible, setVisible] = useState(false);
  const showOrDontModal = () => {
    setVisible(!visible);
  };

  const handleDelete =
    (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
      const isSaved: any = await dispatch(removeScanner({ id }));
      if (!isSaved.error) {
        dispatch(
          fetchScanners({ limit: 12, offset: 0, tags: [selectedDatabaseURL] }),
        );
        setVisible(!visible);
      }
    };

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
        tags: [selectedDatabaseURL],
      }),
    );
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8];
  // const [loadingPercent, setLoadingPercent] = useState(0);
  // const fixData = async () => {
  //   const fixDataRecursively = async (index: number) => {
  //     if (index >= scanners.length) {
  //       setLoadingPercent(0);
  //       return;
  //     }

  //     const isSaved: any = await dispatch(
  //       updateScanner({
  //         id: scanners[index].id,
  //         barCode: scanners[index].barCode,
  //         qrCode: scanners[index].qrCode,
  //         tags: [tags[0].id],
  //       }),
  //     );
  //     if (isSaved.error) {
  //       openErrorNotification(`error in id: ${scanners[index].id}`);
  //       dispatch(fetchScanners({ limit: 12, offset: 0, tags: [tags[0].url] }));
  //       return;
  //     }
  //     setLoadingPercent(Math.floor((index * 100) / scanners.length));
  //     fixDataRecursively(index + 1);
  //   };
  //   fixDataRecursively(0);
  // };

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <div className={styles.CodesWrapper}>
            <div className={styles.scannerWrapper}>
              {isClient && (
                <CodeDecoder
                  tags={tags}
                  selectedDatabase={selectedDatabase}
                  setSelectedDatabase={setSelectedDatabase}
                />
              )}
            </div>
            <button
              onClick={() =>
                dispatch(
                  fetchScanners({ limit: 12, offset: 0, tags: [tags[0].url] }),
                )
              }
            >
              Обновить данные
            </button>
            {/* <button
              onClick={() => {
                dispatch(fetchScanners({ limit: 100000, offset: 0 }));
              }}
            >
              loadData
            </button>
            <button
              onClick={() => {
                fixData();
              }}
            >
              {loadingPercent !== 0 ? `fixing ${loadingPercent}%` : 'fix data'}
            </button> */}
            <div className={styles.options_container}>
              <h1>выберите базу данных</h1>
              <select
                className={styles.option_wrapper}
                onChange={(evt) => {
                  setSelectedDatabaseURL(evt.target.value);
                  dispatch(
                    fetchScanners({
                      limit: 12,
                      offset: 0,
                      tags: [evt.target.value],
                    }),
                  );
                }}
              >
                {tags.map((tag) => {
                  return <option value={tag.url}>{tag.name}</option>;
                })}
              </select>
            </div>
            {loading ? (
              <div className={styles.scannerDataWrapper}>
                <div className={styles.itemWrapper}>
                  <p>ID</p>
                  <p>|</p>
                  <p>QR-код</p>
                  <p>|</p>
                  <p>Штрих-код</p>
                </div>
                {dummy.map((data, index) => {
                  return (
                    <div key={index} className={styles.itemWrapper}>
                      <p
                        className={styles.LoaderMask}
                        style={{ width: '100%', height: '20px' }}
                      />
                      <p>|</p>
                      <p
                        className={styles.LoaderMask}
                        style={{ width: '100%', height: '20px' }}
                      />
                      <p>|</p>
                      <p
                        className={styles.LoaderMask}
                        style={{ width: '100%', height: '20px' }}
                      />
                    </div>
                  );
                })}
              </div>
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

                        <Modal
                          title="Подтвердите действие."
                          open={visible}
                          onOk={handleDelete(scans.id!, dispatch, setVisible)}
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
