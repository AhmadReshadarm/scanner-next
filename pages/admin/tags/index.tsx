import { Button, Spin, Table } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { AppContext } from 'common/context/AppContext';
import { navigateTo } from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import AdminLayout from 'components/admin/adminLayout/layout';
import { columns } from 'components/admin/tags/constants';
// import { handleTableChange } from 'components/admin/tags/helpers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page } from 'routes/constants';

import { clearTags, fetchTags } from '../../../redux/slicers/tagsSlicer';
import styles from './index.module.scss';
import Head from 'next/head';

const TagsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);
  const isLoading = useAppSelector((state) => state.tags.loading);
  const router = useRouter();

  const dataSource = tags?.map(({ id, name, url }) => ({
    key: id,
    id,
    name,
    url,
  })) as unknown as DataType[];

  useEffect(() => {
    dispatch(
      fetchTags({
        offset: String(offset),
        limit: '20',
      }),
    );

    return () => {
      dispatch(clearTags());
      setOffset(0);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Администрирование {`>`} Коллекция | NBHOZ</title>
      </Head>
      <div className={styles.tagsHeader}>
        <h1 className={styles.tagsHeader__title}>Коллекция</h1>
        <Button
          className={styles.tagsHeader__createTagButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_TAG)}
        >
          Создать новый Коллекция
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
              fetchTags({
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

TagsPage.PageLayout = AdminLayout;

export default TagsPage;
