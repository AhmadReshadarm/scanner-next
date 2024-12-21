import AdminLayout from 'components/admin/adminLayout/layout';
import ManageTagForm from 'components/admin/tags/ManageTagForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearTag,
  fetchTag,
  fetchTags,
} from '../../../redux/slicers/tagsSlicer';
import Head from 'next/head';

const EditTag = () => {
  const title = 'Редактирование Коллекция';
  const router = useRouter();
  const tags = useAppSelector((state) => state.tags.tags);
  const filteredTags = tags.filter((tag) => tag.id !== Number(router.query.id));
  const tag = useAppSelector((state) => state.tags.tag);
  const isLoading = useAppSelector((state) => state.tags.loading);
  const isSaveLoading = useAppSelector((state) => state.tags.saveLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchTag(router.query.id as string));
    }
  }, [dispatch, router.query]);

  return (
    <>
      <Head>
        <title>Администрирование {`>`} Редактирование Коллекция | NBHOZ</title>
      </Head>
      <ManageTagForm
        title={title}
        editMode={true}
        tag={tag}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </>
  );
};

EditTag.PageLayout = AdminLayout;

export default EditTag;
