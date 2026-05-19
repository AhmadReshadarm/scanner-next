import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  fetchScanners,
  fetchScannersForExecl,
  removeScanner,
} from 'redux/slicers/scannerSlicer';
import { TScanner } from 'redux/types';
import styles from '../components/store/homePage/styles/main.module.css';
import CodeDecoder from 'components/store/homePage/CodeDecoder';
import { Button, Modal, InputNumber, Progress } from 'antd';
import Pagination from 'antd/es/pagination';
import { DeleteOutlined } from '@ant-design/icons';
import { AppDispatch } from 'redux/store';
import { clearTags, fetchTags } from 'redux/slicers/tagsSlicer';
import { unwrapResult } from '@reduxjs/toolkit';
import { ScannerResponse } from 'swagger/services';
import ExcelJs from 'exceljs';
import CodeGenerator from 'components/store/homePage/CodeGenerator';

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

  // ----- Excel batch download states -----
  const [batchSize, setBatchSize] = useState<number>(50000);
  const [totalRecords, setTotalRecords] = useState<number | null>(null);
  const [downloadedBatches, setDownloadedBatches] = useState<Set<number>>(
    new Set(),
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0); // 0–100

  // Workbook ref to accumulate rows across batches
  const workbookRef = useRef<ExcelJs.Workbook | null>(null);
  const sheetRef = useRef<ExcelJs.Worksheet | null>(null);

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

  // Reset download state when database changes
  useEffect(() => {
    resetDownloadState();
  }, [selectedDatabaseURL]);

  const resetDownloadState = () => {
    setTotalRecords(null);
    setDownloadedBatches(new Set());
    setDownloadProgress(0);
    workbookRef.current = null;
    sheetRef.current = null;
  };

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
  const fetchTotalCount = async (): Promise<number> => {
    const response: ScannerResponse = await dispatch(
      fetchScannersForExecl({
        limit: 1,
        offset: 0,
        tags: [selectedDatabaseURL],
      }),
    ).then(unwrapResult);
    return response.length ?? 0;
  };

  const handleStartDownload = async () => {
    if (!selectedDatabaseURL) return;

    // Reset workbook and sheet for a fresh download
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet('subscribers');
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
    workbookRef.current = workbook;
    sheetRef.current = sheet;

    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadedBatches(new Set());

    // Fetch total records if not already known
    let total = totalRecords;
    if (total === null) {
      total = await fetchTotalCount();
      setTotalRecords(total);
    }

    if (total === 0) {
      setIsDownloading(false);
      return;
    }

    const effectiveBatchSize = Math.min(batchSize, 50000);
    const totalBatches = Math.ceil(total / effectiveBatchSize);
    let completedBatches = 0;

    // Process each batch sequentially
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const offset = batchIndex * effectiveBatchSize;
      // Skip already downloaded batches (if resuming after reset)
      if (downloadedBatches.has(offset)) {
        completedBatches++;
        setDownloadProgress(
          Math.floor((completedBatches / totalBatches) * 100),
        );
        continue;
      }

      const response: ScannerResponse = await dispatch(
        fetchScannersForExecl({
          limit: effectiveBatchSize,
          offset,
          tags: [selectedDatabaseURL],
        }),
      ).then(unwrapResult);

      if (response.rows && Array.isArray(response.rows)) {
        // Add rows in chunk to keep UI responsive
        const CHUNK_SIZE = 500;
        for (let i = 0; i < response.rows.length; i += CHUNK_SIZE) {
          const chunk = response.rows.slice(i, i + CHUNK_SIZE);
          for (const row of chunk) {
            sheet.addRow({
              id: row.id,
              qrCode: row.qrCode,
              barCode: row.barCode,
            });
            sheet.getRow(sheet.rowCount).alignment = {
              vertical: 'middle',
              horizontal: 'center',
              wrapText: true,
            };
          }
          // Yield to UI thread
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }

      // Mark this batch as downloaded
      setDownloadedBatches((prev) => new Set(prev).add(offset));
      completedBatches++;
      setDownloadProgress(Math.floor((completedBatches / totalBatches) * 100));
    }

    // All batches processed – generate file and trigger download
    if (workbookRef.current) {
      const buffer = await workbookRef.current.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${new Date().toISOString().split('T')[0]}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    }

    setIsDownloading(false);
    setDownloadProgress(100);
  };

  const handleResetDownload = () => {
    resetDownloadState();
  };

  const totalBatches = totalRecords
    ? Math.ceil(totalRecords / Math.min(batchSize, 50000))
    : 0;

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

            {/* ---------- Excel batch download UI ---------- */}
            <div
              style={{
                margin: '20px 0',
                padding: '15px',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
              }}
            >
              <h3>Скачать все данные (Excel) пакетами</h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  flexWrap: 'wrap',
                  marginBottom: '10px',
                }}
              >
                <span>Размер пакета (макс. 50000):</span>
                <InputNumber
                  min={1}
                  max={50000}
                  value={batchSize}
                  onChange={(val) => setBatchSize(val || 50000)}
                  disabled={isDownloading}
                  style={{ width: 120 }}
                />
                <Button
                  type="primary"
                  onClick={handleStartDownload}
                  loading={isDownloading}
                  disabled={isDownloading || !selectedDatabaseURL}
                >
                  {isDownloading
                    ? `Скачивание ${downloadProgress}%`
                    : 'Начать скачивание'}
                </Button>
                <Button onClick={handleResetDownload} disabled={isDownloading}>
                  Сбросить прогресс
                </Button>
              </div>

              {totalRecords !== null && (
                <div style={{ marginBottom: '10px' }}>
                  <p>
                    Всего записей: <strong>{totalRecords}</strong> | Пакетов:{' '}
                    <strong>{totalBatches}</strong>
                  </p>
                  <p>
                    Скачано пакетов: <strong>{downloadedBatches.size}</strong>{' '}
                    из {totalBatches}
                  </p>
                </div>
              )}

              {isDownloading && (
                <Progress
                  percent={downloadProgress}
                  status="active"
                  style={{ marginTop: '10px' }}
                />
              )}
            </div>
            {/* ---------------------------------------------- */}

            <CodeGenerator />
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

export default IndexPage;
