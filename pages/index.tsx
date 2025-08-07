import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchScanners, removeScanner } from 'redux/slicers/scannerSlicer';
import { TScanner } from 'redux/types';
import styles from '../components/store/homePage/styles/main.module.css';
import CodeDecoder from 'components/store/homePage/CodeDecoder';
import { Button, Modal } from 'antd';
import Pagination from 'antd/es/pagination';
import { DeleteOutlined } from '@ant-design/icons';
import { AppDispatch } from 'redux/store';
import { clearTags, fetchTags } from 'redux/slicers/tagsSlicer';
import { unwrapResult } from '@reduxjs/toolkit';
import { ScannerResponse } from 'swagger/services';
import ExcelJs from 'exceljs';

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
    dispatch(fetchTags({ limit: '10000', offset: '0', orderBy: 'ASC' }));
    setClient(true);
    return () => {
      dispatch(clearTags());
    };
  }, []);

  useEffect(() => {
    if (tags.length !== 0) {
      setSelectedDatabase(tags[0].id);
      setSelectedDatabaseURL(tags[0].url);
      dispatch(
        fetchScanners({
          limit: 12,
          offset: 0,
          tags: [tags[0].url],
        }),
      );
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

  // -----------------------------------------------------------------------------------

  const handleProductDownloadInExcel = (
    dispatch,
    setLoadingData,
    ExcelJs,
    seLoadingProgress,
  ) => {
    setLoadingData(true);
    dispatch(
      fetchScanners({
        limit: 100000,
        offset: 0,
        tags: [selectedDatabaseURL],
      }),
    )
      .then(unwrapResult)
      .then((response: ScannerResponse) => {
        setLoadingData(true);
        if (!response.rows || !Array.isArray(response.rows)) {
          console.error(
            'Error: Products data is missing or not in the expected format.',
            response,
          );
          return; // Exit the function to prevent further errors
        }

        let workBook = new ExcelJs.Workbook();
        const sheet = workBook.addWorksheet('subscribers');
        sheet.columns = [
          { header: 'ID', key: 'id', width: 20 },
          { header: 'QR-код', key: 'qrCode', width: 100 },
          { header: 'Штрих-код', key: 'barCode', width: 40 },
        ];
        sheet.getRow(1).alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        };
        // sheet.properties.defaultRowHeight = 115;
        // console.log(response);
        // setLoadingData(false);
        // return;
        let counter = 0;
        let progress = 0;
        const productIteration = async () => {
          if (counter < response.rows!.length) {
            progress = Math.floor((counter * 100) / response.rows!.length);
            seLoadingProgress(progress);

            await sheet.addRow({
              id: response.rows![counter]?.id,
              qrCode: response.rows![counter]?.qrCode,
              barCode: response.rows![counter]?.barCode,
            });
            sheet.getRow(sheet.rowCount).alignment = {
              vertical: 'middle',
              horizontal: 'center',
              wrapText: true,
            };

            counter = counter + 1;
            productIteration();
          } else {
            try {
              workBook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = `${
                  new Date().toISOString().split('T')[0]
                }.xlsx`;
                anchor.click();
                window.URL.revokeObjectURL(url);
              });
              seLoadingProgress(100);
              setLoadingData(false);
              seLoadingProgress(0);
            } catch (error) {
              console.log(error);
            }
          }
        };
        productIteration();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [loadingProgress, seLoadingProgress] = useState(0);
  const [loadingData, setLoadingData] = useState(false);

  // ----------------------------------------------------------------------------------------

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
                  fetchScanners({
                    limit: 12,
                    offset: 0,
                    tags: [selectedDatabaseURL],
                  }),
                )
              }
            >
              Обновить данные
            </button>
            <button
              onClick={() =>
                handleProductDownloadInExcel(
                  dispatch,
                  setLoadingData,
                  ExcelJs,
                  seLoadingProgress,
                )
              }
            >
              {loadingData
                ? `Загрузка ${loadingProgress}%`
                : 'Скачать все как Excel'}
            </button>
            <div className={styles.options_container}>
              <h1>выберите базу данных</h1>
              <select
                className={styles.option_wrapper}
                onChange={(evt) => {
                  setSelectedDatabaseURL(evt.target.value);
                  const payload = {
                    limit: 12,
                    offset: 0,
                    tags: [evt.target.value],
                  };
                  dispatch(fetchScanners(payload));
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
