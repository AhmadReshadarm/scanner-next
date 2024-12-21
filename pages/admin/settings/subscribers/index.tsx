import AdminLayout from 'components/admin/adminLayout/layout';
import { Spin, Table } from 'antd';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useEffect, useState } from 'react';
import color from 'components/store/lib/ui.colors';
import { NewsDataType } from 'common/interfaces/data-type.interface';
import styles from '../index.module.scss';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { columns } from 'components/admin/settings/subscribers/constants';
import {
  fetchSubscribers,
  // fetchSubscribersInExcelFile,
  fetchSubscribersInJsonFile,
} from 'redux/slicers/subscriberSlicer';
import { TSubscribers } from 'redux/types';
import styled from 'styled-components';
// import Link from 'next/link';
import Head from 'next/head';
const Subscribers = () => {
  const dispatch = useAppDispatch();
  const { Subscribers, loading } = useAppSelector<TSubscribers>(
    (state) => state.subscribers,
  );

  const dataSource = Subscribers.map(({ id, name, email }) => ({
    key: id,
    id,
    name,
    email,
  })) as unknown as NewsDataType[];

  useEffect(() => {
    dispatch(fetchSubscribers());

    return () => {};
  }, []);

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Настройки {`>`} Подписчики | NBHOZ
        </title>
      </Head>
      <DownloadBtnsWrapper>
        <div className="action-button-intiator-wrapper">
          <button
            onClick={() => setOpen(!isOpen)}
            className="action-button-intiator-button"
          >
            <span>Скачать</span>
          </button>
          <ul
            style={{ display: isOpen ? 'flex' : 'none' }}
            className="options-wrapper"
          >
            {/* <li
              onClick={() => {
                dispatch(fetchSubscribersInExcelFile());
                setOpen(false);
              }}
            >
              Как файл Ms.Excel
            </li> */}
            <li
              onClick={() => {
                dispatch(fetchSubscribersInJsonFile());
                setOpen(false);
              }}
            >
              Как файл .json
            </li>
          </ul>
        </div>
      </DownloadBtnsWrapper>
      {loading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Table
          scroll={{
            y: 768,
          }}
          columns={
            columns as (
              | ColumnGroupType<NewsDataType>
              | ColumnType<NewsDataType>
            )[]
          }
          dataSource={dataSource}
        />
      )}
    </>
  );
};

const DownloadBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 50px 0;

  .action-button-intiator-wrapper {
    width: 200px;
    height: 40px;
    position: relative;
    .action-button-intiator-button {
      width: 100%;
      height: 100%;
      background-color: ${color.btnSecondery};
      cursor: pointer;
      transition: 300ms;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 3px;

      &:hover {
        background-color: ${color.searchBtnBg};

        transform: scale(1.02);
      }
      &:active {
        transform: scale(1);
        background-color: ${color.btnPrimary};
        color: ${color.textPrimary};
      }
      span {
        font-family: ver(--font-Jost);
        font-size: 1rem;
      }
    }
    .options-wrapper {
      width: 200px;
      background-color: ${color.bgProduct};
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
      padding: 15px;
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 5;
      transition: 200ms;
      box-shadow: 0px 5px 10px 0px ${color.boxShadowBtn};
      li {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: 200ms;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: ${color.searchBtnBg};
          transform: scale(1.02);
        }
        &:active {
          transform: scale(1);
          background-color: ${color.btnPrimary};
          color: ${color.textPrimary};
        }
      }
    }
  }
`;

Subscribers.PageLayout = AdminLayout;

export default Subscribers;
