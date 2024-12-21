import AdminLayout from 'components/admin/adminLayout/layout';
import ManageTagForm from 'components/admin/tags/ManageTagForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchTags } from '../../../../redux/slicers/tagsSlicer';
import Head from 'next/head';

const CreateTag = () => {
  const title = 'Создание Коллекция';
  const isLoading = useAppSelector((state) => state.tags.loading);
  const isSaveLoading = useAppSelector((state) => state.tags.saveLoading);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Создание Коллекция | NBHOZ</title>
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

CreateTag.PageLayout = AdminLayout;

export default CreateTag;
