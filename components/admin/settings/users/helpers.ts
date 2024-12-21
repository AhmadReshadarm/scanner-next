import { AppDispatch } from 'redux/store';
import { navigateTo, openErrorNotification } from '../../../../common/helpers';
import { NextRouter } from 'next/router';
import { Page } from 'routes/constants';
import { createUser, deleteUser, fetchUsers } from 'redux/slicers/authSlicer';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
export const handleDeleteUser =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteUser(id));
    if (!isSaved.error) {
      dispatch(
        fetchUsers({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

export const handleFormSubmitUsers =
  (router: NextRouter, dispatch: AppDispatch) => async (form) => {
    if (isEmpty(form.email)) {
      openErrorNotification('Адрес электронной почты не может быть пустым');
      return;
    }
    if (!isEmail(form.email)) {
      openErrorNotification('Неверный адрес электронной почты');
      return;
    }
    if (isEmpty(form.password)) {
      openErrorNotification('пароль не может быть пустым');
      return;
    }
    const isSaved: any = await dispatch(createUser({ ...form }));

    if (!isSaved.error) {
      navigateTo(router, Page.ADMIN_SETTINGS_USERS)();
    }
  };
