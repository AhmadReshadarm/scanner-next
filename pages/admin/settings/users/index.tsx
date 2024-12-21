import AdminLayout from 'components/admin/adminLayout/layout';
import { Button, Spin, Table } from 'antd';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from 'common/context/AppContext';
import { clearUsers, fetchUsers } from 'redux/slicers/authSlicer';
import { useRouter } from 'next/router';
import { NewsDataType } from 'common/interfaces/data-type.interface';
import styles from '../index.module.scss';
import { navigateTo } from 'common/helpers';
import { Page } from 'routes/constants';
import { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';
import { columns } from 'components/admin/settings/users/constants';
import Head from 'next/head';

const AnalyticsUsers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { offset, setOffset } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector<TAuthState>((state) => state.auth);
  const router = useRouter();

  const dataSource = users.map(
    ({ id, firstName, lastName, email, role, image }) => ({
      key: id,
      id,
      firstName,
      lastName,
      email,
      role,
      image,
    }),
  ) as unknown as NewsDataType[];

  useEffect(() => {
    dispatch(
      fetchUsers({
        offset: String(offset),
        limit: '20',
        sortBy: 'id',
      }),
    );

    return () => {
      dispatch(clearUsers());
      setOffset(0);
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Настройки {`>`} Пользователи | NBHOZ
        </title>
      </Head>
      <div className={styles.newsPostsHeader}>
        <h1 className={styles.newsPostsHeader__title}>Пользователи</h1>
        <Button
          className={styles.newsPostsHeader__createnewsPostsButton}
          type="primary"
          onClick={navigateTo(router, Page.ADMIN_CREATE_SETTINGS_USERS)}
        >
          Создать пользователя
        </Button>
      </div>
      {loading ? (
        <Spin className={styles.spinner} size="large" />
      ) : (
        <Table
          scroll={{
            y: 768,
          }}
          pagination={{
            pageSize: 20,
            current: currentPage,
            locale: { items_per_page: '/ странице' },
          }}
          columns={
            columns as (
              | ColumnGroupType<NewsDataType>
              | ColumnType<NewsDataType>
            )[]
          }
          dataSource={dataSource}
          onChange={(event) => {
            const newOffset = ((event.current as number) - 1) * 20;
            setOffset(newOffset);
            dispatch(
              fetchUsers({
                offset: String(newOffset),
                limit: '20',
                sortBy: 'id',
              }),
            );
            setCurrentPage(event.current as number);
          }}
        />
      )}
    </>
  );
};

AnalyticsUsers.PageLayout = AdminLayout;

export default AnalyticsUsers;
