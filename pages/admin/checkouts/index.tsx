import { Spin, Table, Button } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { CheckoutsData } from 'components/admin/checkouts/CheckoutsData.interface';
import { columns } from 'components/admin/checkouts/constants';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearCheckouts,
  fetchCheckoutsAll,
} from '../../../redux/slicers/checkoutsSlicer';
import styles from './index.module.scss';
import { navigateTo } from 'common/helpers';
import { useRouter } from 'next/router';
import { Page } from 'routes/constants';
import Head from 'next/head';
const CheckoutsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const checkouts = useAppSelector((state) => state.checkouts.checkouts);
  const isLoading = useAppSelector((state) => state.checkouts.loading);

  const dataSource = checkouts?.map(
    ({
      id,
      user,
      basket,
      address,
      comment,
      createdAt,
      ...rest
    }): CheckoutsData => ({
      key: id as string,
      id,
      user,
      basket,
      address,
      createdAt,
      comment,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchCheckoutsAll({
        offset: String(offset),
        limit: '20',
      }),
    );
    return () => {
      dispatch(clearCheckouts());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Заказы | NBHOZ</title>
      </Head>
      <div className={styles.checkoutsHeader}>
        <h1 className={styles.checkoutsHeader__title}>Заказы</h1>
        <Button
          className={styles.productsHeader__createCheckoutButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_CHECKOUTS)}
        >
          Создать новый заказ
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
              fetchCheckoutsAll({
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

CheckoutsPage.PageLayout = AdminLayout;

export default CheckoutsPage;
