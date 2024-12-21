import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/colors/constants';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearColors, fetchColors } from 'redux/slicers/colorsSlicer';
import { Page } from 'routes/constants';

import styles from './index.module.scss';
import Head from 'next/head';

const Colors = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const colors = useAppSelector((state) => state.colors.colors);
  const isLoading = useAppSelector((state) => state.colors.loading);
  const router = useRouter();

  const dataSource = colors?.map(({ id, name, url, code, ...rest }) => ({
    key: id,
    id,
    name,
    url,
    code,
  })) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchColors({
        offset: String(offset),
        limit: '20',
      }),
    );

    return () => {
      dispatch(clearColors());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Цвета | NBHOZ</title>
      </Head>
      <div className={styles.colorsHeader}>
        <h1 className={styles.colorsHeader__title}>Цвета</h1>
        <Button
          className={styles.colorsHeader__createColorButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_COLORS)}
        >
          Создать новый цвет
        </Button>
      </div>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Table
          scroll={{
            // x: 1366,
            y: 768,
          }}
          pagination={{
            pageSize: 20,
            current: currentPage,
            locale: { items_per_page: '/ странице' },
          }}
          columns={
            columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
          }
          dataSource={dataSource}
          onChange={(event) => {
            const newOffset = ((event.current as number) - 1) * 20;
            setOffset(newOffset);
            dispatch(
              fetchColors({
                offset: String(newOffset),
                limit: '20',
              }),
            );
            setCurrentPage(event.current as number);
          }}
        />
      )}
    </>
  );
};

Colors.PageLayout = AdminLayout;

export default Colors;
