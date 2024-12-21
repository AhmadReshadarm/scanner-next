import { TableProps } from 'antd';
import {
  hasWhiteSpace,
  navigateTo,
  openErrorNotification,
} from 'common/helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { NextRouter } from 'next/router';
import {
  createTag,
  deleteTag,
  editTag,
  fetchTags,
} from 'redux/slicers/tagsSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';

export const handleTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  // console.log('params', pagination, filters, sorter, extra);
};

export const handleFormSubmit =
  (router: NextRouter, dispatch: AppDispatch) => async (form) => {
    if (hasWhiteSpace(form.url)) {
      openErrorNotification(
        'В URL-адресе не допускается использование пробелов.',
      );
      return;
    }
    if (router.query.id) {
      const isSaved: any = await dispatch(
        editTag({
          ...form,
          id: router.query.id,
        }),
      );

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_TAGS)();
      }

      return;
    }

    const isSaved: any = await dispatch(createTag(form));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_TAGS)();
    }
  };

export const handleDeleteTag =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteTag(id));
    if (!isSaved.error) {
      dispatch(
        fetchTags({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

export const handleRedirectTags = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_TAGS]}/${id}`);
};
