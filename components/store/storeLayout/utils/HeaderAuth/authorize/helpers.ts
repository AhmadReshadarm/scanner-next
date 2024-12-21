import { Dispatch, SetStateAction, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { paginateTo } from 'components/store/checkout/constant';
import { AppDispatch } from 'redux/store';
import {
  clearServerErr,
  signout,
  signup,
  userSignin,
} from 'redux/slicers/authSlicer';
import { PopupDisplay } from '../../../constants';

const UsePagination = (): [
  number,
  string,
  (newDirection: number, newType: any) => void,
] => {
  const [direction, setPage]: [number, any] = useState(0);
  const [authType, setAuthType]: [any, any] = useState('selection');

  const paginate = (newDirection: number, newType: any) => {
    setPage(newDirection);
    setAuthType(newType);
  };

  return [direction, authType, paginate];
};

const handleBack = (paginate, emailErr, pswErr, dispatch: AppDispatch) => {
  paginate(paginateTo.back, 'selection');
  emailErr(false);
  pswErr(false);
  dispatch(clearServerErr());
};

const handleSignIn =
  ({
    email,
    password,
    dispatch,
  }: {
    email: string;
    password: string;
    dispatch: AppDispatch;
  }) =>
  async (e) => {
    e.preventDefault();
    if (isEmail(email) && !isEmpty(password)) {
      const payload = {
        email,
        password,
      };

      await dispatch(userSignin(payload));
    }
  };

const handleLogout = (dispatch: AppDispatch) => () => {
  dispatch(signout());
};

const handleSignUp =
  (
    email: string,
    isSubscribed: boolean,
    paginate: any,
    dispatch: AppDispatch,
  ) =>
  async (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      const payload = {
        email,
        isSubscribed,
      };
      await dispatch(signup(payload));
      paginate(paginateTo.back, 'selection');
    }
  };

const handleLastNameChange =
  (
    nameInput: boolean,
    emailInput: boolean,
    setlastName: Dispatch<SetStateAction<string>>,
    setInputsErr: Dispatch<SetStateAction<[boolean, boolean, boolean]>>,
  ) =>
  (e) => {
    setlastName(e.target.value);
    setInputsErr([nameInput ? true : false, true, emailInput ? true : false]);
  };

export {
  UsePagination,
  handleBack,
  handleSignIn,
  handleSignUp,
  handleLogout,
  handleLastNameChange,
};
