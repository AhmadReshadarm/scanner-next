import { Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { getColumns } from 'components/admin/reviews/constant';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import {
  clearReviews,
  fetchReviews,
} from '../../../redux/slicers/reviewsSlicer';
import styles from './index.module.scss';
import Head from 'next/head';

const ReviewsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const isLoading = useAppSelector((state) => state.reviews.loading);

  const dataSource = reviews?.map(
    ({ id, rating, text, product, user, showOnMain, ...rest }) => ({
      key: id,
      id,
      rating,
      text,
      product: product,
      user,
      showOnMain,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchReviews({
        offset: String(offset),
        limit: '20',
      }),
    );
    return () => {
      dispatch(clearReviews());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Отзывы | NBHOZ</title>
      </Head>
      <div className={styles.reviewsHeader}>
        <h1 className={styles.reviewsHeader__title}>Отзывы</h1>
      </div>
      {isLoading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <>
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
              getColumns(dispatch) as (
                | ColumnGroupType<DataType>
                | ColumnType<DataType>
              )[]
            }
            dataSource={dataSource}
            onChange={(event) => {
              const newOffset = ((event.current as number) - 1) * 20;
              setOffset(newOffset);
              dispatch(
                fetchReviews({
                  offset: String(newOffset),
                  limit: '20',
                }),
              );
              setCurrentPage(event.current as number);
            }}
          />
        </>
      )}
    </>
  );
};

ReviewsPage.PageLayout = AdminLayout;

export default ReviewsPage;
