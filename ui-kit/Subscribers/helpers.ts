import { openErrorNotification } from 'common/helpers';
import { useState } from 'react';
import {
  createSubscriber,
  sendAdminCallEmail,
} from 'redux/slicers/subscriberSlicer';
import { AppDispatch } from 'redux/store';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
const UsePagination = (): [
  number,
  string,
  (newDirection: number, newType: any) => void,
] => {
  const [direction, setPage]: [number, any] = useState(0);
  const [authType, setAuthType]: [any, any] = useState('call');

  const paginate = (newDirection: number, newType: any) => {
    setPage(newDirection);
    setAuthType(newType);
  };

  return [direction, authType, paginate];
};

const handleSubscriber =
  (name: string, email: string, dispatch: AppDispatch) => () => {
    if (isEmpty(email))
      return openErrorNotification(
        'адрес электронной почты не может быть пустым',
      );
    if (isEmpty(name)) return openErrorNotification('имя не может быть пустым');
    if (!isEmail(email))
      return openErrorNotification('Неверный адрес электронной почты');
    dispatch(createSubscriber({ name, email }));
  };

const handleAdminCall =
  (name: string, phone: string, dispatch: AppDispatch) => async () => {
    if (isEmpty(phone))
      return openErrorNotification('Номер телефона не может быть пустым');
    if (isEmpty(name)) return openErrorNotification('имя не может быть пустым');

    dispatch(
      sendAdminCallEmail({
        to: 'NBHOZ <info@nbhoz.ru>',
        subject: `${name} просит перезвонить`,
        html: `
        <div style="width:100%;">
        <div style="width:90%; display: flex; flex-direction:row; justify-content:center; align-items:center;  padding: 30px 40px 30px 40px; background-color:#FDE5AC; border-radius: 20px;">
        <a href="https://nbhoz.ru" target="__blank"><img src="https://nbhoz.ru/static/NBHOZ_LOGO.png" alt="NBHOZ"></a>
        </div>
        <div style="padding:20px 0px 20px 0px" >Имя: ${name}</div>
        <div style="padding:20px 0px 20px 0px" >Номер телефона: ${phone}</div>
        </div>
        `,
      }),
    );
  };

export { UsePagination, handleSubscriber, handleAdminCall };
