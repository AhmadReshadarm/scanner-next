import { basicRequestParams } from 'common/constants';
import { AppContext } from 'common/context/AppContext';
import AdminLayout from 'components/admin/adminLayout/layout';
import ManageCategoryForm from 'components/admin/categories/ManageCategoryForm';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import {
  clearCategory,
  fetchCategories,
  fetchCategory,
} from '../../../redux/slicers/categoriesSlicer';
import Head from 'next/head';

const EditCategory = () => {
  const title = 'Редактирование категории';
  const router = useRouter();
  const categories = useAppSelector((state) => state.categories.categories);
  const filteredCategories = categories?.filter(
    (category) => category.id !== Number(router.query.id) && !category.parent,
  );
  const category = useAppSelector((state) => state.categories.category);
  const isLoading = useAppSelector((state) => state.categories.loading);
  const isSaveLoading = useAppSelector((state) => state.categories.saveLoading);
  const { offset, setOffset } = useContext(AppContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories(basicRequestParams));

    return () => {
      dispatch(clearCategory());
      dispatch(clearImageList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchCategory(router.query.id as string));
    }
  }, [dispatch, router.query]);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Категории {`>`} Редактирование категории |
          NBHOZ
        </title>
      </Head>
      <ManageCategoryForm
        title={title}
        editMode={true}
        categories={filteredCategories}
        category={category}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </>
  );
};

EditCategory.PageLayout = AdminLayout;

export default EditCategory;
