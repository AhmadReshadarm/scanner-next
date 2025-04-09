// import AdminLayout from 'components/admin/adminLayout/layout';
import ManageTagForm from 'components/store/tags/ManageTagForm';
import { useAppSelector } from 'redux/hooks';
import Head from 'next/head';

const CreateTag = () => {
  const title = 'Создание база данных';
  const isLoading = useAppSelector((state) => state.tags.loading);
  const isSaveLoading = useAppSelector((state) => state.tags.saveLoading);

  return (
    <>
      <Head>
        <title>Создание база данных</title>
      </Head>
      <ManageTagForm
        title={title}
        editMode={false}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </>
  );
};

// CreateTag.PageLayout = AdminLayout;

export default CreateTag;
