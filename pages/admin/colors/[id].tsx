import AdminLayout from 'components/admin/adminLayout/layout';
import ManageColorForm from 'components/admin/colors/ManageColorForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  clearColors,
  fetchColors,
  fetchChosenColor,
  clearChosenColor,
} from '../../../redux/slicers/colorsSlicer';
import Head from 'next/head';

const ManageColor = () => {
  const title = 'Редактирование цвета';
  const router = useRouter();
  const colors = useAppSelector((state) => state.colors.colors);
  const filteredColors = colors.filter(
    (color) => color.id !== Number(router.query.id),
  );
  const color = useAppSelector((state) => state.colors.chosenColor);
  const isLoading = useAppSelector((state) => state.colors.loading);
  const isSaveLoading = useAppSelector((state) => state.colors.saveLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchChosenColor(router.query.id as string));
    }

    return () => {
      dispatch(clearChosenColor());
    };
  }, [dispatch, router.query]);

  return (
    <>
      <Head>
        <title>
          Администрирование {`>`} Цвета {`>`} Редактирование Цвета | NBHOZ
        </title>
      </Head>
      <ManageColorForm
        title={title}
        editMode={true}
        colors={filteredColors}
        color={color}
        isLoading={isLoading}
        isSaveLoading={isSaveLoading}
      />
    </>
  );
};

ManageColor.PageLayout = AdminLayout;

export default ManageColor;
