import {
  deleteColor,
  fetchColors,
  createColor,
  editColor,
} from 'redux/slicers/colorsSlicer';
import { AppDispatch } from 'redux/store';
import {
  hasWhiteSpace,
  navigateTo,
  openErrorNotification,
} from '../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import { TableProps } from 'antd';
import { DataType } from 'common/interfaces/data-type.interface';

export const handleDeleteColor =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteColor(id));
    if (!isSaved.error) {
      dispatch(
        fetchColors({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

export const handleFormSubmitColors =
  (router: NextRouter, dispatch: AppDispatch) => async (form) => {
    if (hasWhiteSpace(form.url)) {
      openErrorNotification(
        'В URL-адресе не допускается использование пробелов.',
      );
      return;
    }
    if (router.query.id) {
      const isSaved: any = await dispatch(
        editColor({
          ...form,
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_COLORS)();
      }

      return;
    }
    if (!form.code) {
      openErrorNotification('Пожалуйста, укажите цвет.');
      return;
    }
    const isSaved: any = await dispatch(createColor(form));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_COLORS)();
    }
  };

export const handleRedirectColors = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_COLORS]}/${id}`);
};

export const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  // console.log('params', pagination, filters, sorter, extra);
};
