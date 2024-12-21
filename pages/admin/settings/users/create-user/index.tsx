import AdminLayout from 'components/admin/adminLayout/layout';
import ManageUsersForm from 'components/admin/settings/users/ManageUsersForm';
import Head from 'next/head';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';

const CreateNewsPost = () => {
  const title = 'Создание пользователь';
  const { loading } = useAppSelector<TAuthState>((state) => state.auth);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Настройки {`>`} Пользователи {`>`} Создание
          пользователь | NBHOZ
        </title>
      </Head>
      <ManageUsersForm title={title} isLoading={loading} />
    </>
  );
};

CreateNewsPost.PageLayout = AdminLayout;

export default CreateNewsPost;
