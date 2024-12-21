import { Pagination, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/questions/constants';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearProductsWithQuestions } from 'redux/slicers/store/productInfoSlicer';
import { TQuestionState } from 'redux/types';

import styles from './index.module.scss';
import { fetchQuestions } from 'redux/slicers/questionSlicer';
import Head from 'next/head';

const PAGE_ITEMS_LIMIT = 20;

const QuestionsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const { questions, loading, questionsLenght } =
    useAppSelector<TQuestionState>((state) => state.questions);

  const dataSource = (questions as any)?.map(
    ({ id, text, user, product, ...rest }) => ({
      key: id,
      id,
      text,
      user,
      product,
    }),
  ) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchQuestions({
        offset: String(offset),
        limit: String(PAGE_ITEMS_LIMIT),
      }),
    );

    return () => {
      dispatch(clearProductsWithQuestions());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Вопросы | NBHOZ</title>
      </Head>
      {loading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <>
          <Table
            scroll={{
              // x: 1366,
              y: 768,
            }}
            columns={
              columns as (ColumnGroupType<DataType> | ColumnType<DataType>)[]
            }
            pagination={false}
            dataSource={dataSource}
          />
          <Pagination
            style={{ marginTop: '20px' }}
            defaultCurrent={currentPage}
            total={questionsLenght}
            pageSize={PAGE_ITEMS_LIMIT}
            onChange={(current) => {
              const newOffset = ((current as number) - 1) * PAGE_ITEMS_LIMIT;
              setOffset(newOffset);
              dispatch(
                fetchQuestions({
                  offset: String(newOffset),
                  limit: String(PAGE_ITEMS_LIMIT),
                }),
              );
              setCurrentPage(current as number);
            }}
            locale={{ items_per_page: '/ странице' }}
          />
        </>
      )}
    </>
  );
};

QuestionsPage.PageLayout = AdminLayout;

export default QuestionsPage;
