import { basicRequestParams } from 'common/constants';
import AdminLayout from 'components/admin/adminLayout/layout';
import ManageCategoryForm from 'components/admin/categories/ManageCategoryForm';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { clearImageList } from 'redux/slicers/imagesSlicer';
import { fetchCategories } from '../../../../redux/slicers/categoriesSlicer';
import Head from 'next/head';

const CreateCategory = () => {
  const title = 'Создание категории';
  const categories = useAppSelector((state) => state.categories.categories);
  const filteredCategories = categories?.filter((category) => !category.parent);
  const isLoading = useAppSelector((state) => state.categories.loading);
  const isSaveLoading = useAppSelector((state) => state.categories.saveLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories(basicRequestParams));

    return () => {
      dispatch(clearImageList());
    };
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Категории {`>`} Создание категории | NBHOZ
        </title>
      </Head>
      <ManageCategoryForm
        title={title}
        editMode={false}
        categories={filteredCategories}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </>
  );
};

CreateCategory.PageLayout = AdminLayout;

export default CreateCategory;
