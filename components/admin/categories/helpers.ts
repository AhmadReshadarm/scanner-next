import {
  hasWhiteSpace,
  navigateTo,
  openErrorNotification,
} from 'common/helpers';
import cloneDeep from 'lodash/cloneDeep';
import { NextRouter } from 'next/router';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from 'redux/slicers/categoriesSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';
import { Image, Parameter } from 'swagger/services';
import { FormInstance } from 'antd';
import { imageToCheck, valueToCheck } from '../types';

const handleFormSubmit =
  (
    router: NextRouter,
    dispatch: AppDispatch,
    image: any,
    parameters: Parameter[],
  ) =>
  async (form) => {
    if (hasWhiteSpace(form.url)) {
      openErrorNotification(
        'В URL-адресе не допускается использование пробелов.',
      );
      return;
    }
    if (router.query.id) {
      const payload = {
        ...form,
        image: image[0] ? image[0]?.url?.split('/api/images/')[1] : undefined,
        id: router.query.id,
        parameters,
      };

      const isSaved: any = await dispatch(editCategory(payload));

      if (!isSaved.error) {
        navigateTo(router, Page.ADMIN_CATEGORIES)();
      }

      return;
    }

    const isSaved: any = await dispatch(
      createCategory({
        ...form,
        image: image[0] ? image[0]?.url?.split('/api/images/')[1] : undefined,
        parameters,
      }),
    );

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_CATEGORIES)();
    }
  };

const handleDeleteCategory =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteCategory(id));
    if (!isSaved.error) {
      dispatch(
        fetchCategories({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

const handleRedirectCategory = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_CATEGORIES]}/${id}`);
};

const handleRedirectProduct = (url: string, router: NextRouter) => () => {
  router.push(`/product/${url}`);
};

const handleParameterChange =
  (index: number, setParameters: Dispatch<SetStateAction<Parameter[]>>) =>
  (e) => {
    setParameters((prev) => {
      const parameters = cloneDeep(prev);

      parameters[index].name = e.target.value;

      return parameters;
    });
  };

const handleAddParameter =
  (setParameters: Dispatch<SetStateAction<Parameter[]>>) => () => {
    setParameters((prev) => {
      const parameters = cloneDeep(prev);

      parameters.push({
        name: '',
      });

      return parameters;
    });
  };

const handleRemoveParameter =
  (index: number, setParameters: Dispatch<SetStateAction<Parameter[]>>) =>
  () => {
    setParameters((prev) => {
      const parameters = cloneDeep(prev);

      parameters.splice(index, 1);

      return parameters;
    });
  };

const handleChangeParent =
  (setHasParent: Dispatch<SetStateAction<boolean>>) => (id: string) => {
    setHasParent(!!id);
  };

export {
  handleFormSubmit,
  handleDeleteCategory,
  handleRedirectCategory,
  handleRedirectProduct,
  handleParameterChange,
  handleRemoveParameter,
  handleAddParameter,
  handleChangeParent,
};
