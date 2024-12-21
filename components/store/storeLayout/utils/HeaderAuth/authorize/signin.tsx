import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { handleSignIn } from './helpers';
import Link from 'next/link';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import { useAppDispatch } from 'redux/hooks';
import { handleMenuStateRedux } from 'components/store/storeLayout/helpers';
import {
  changeAuthFormDisplayState,
  changeAuthFormState,
} from 'redux/slicers/store/globalUISlicer';
import { useAppSelector } from 'redux/hooks';
import { TGlobalUIState } from 'redux/types';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '../../../styles/singIn-singUp.module.css';
type Props = {
  direction: number;
  authType: string;
};
const SignIn: React.FC<Props> = ({ direction, authType }) => {
  const dispatch = useAppDispatch();
  const [[email, password], setAuthPayload] = useState<[string, string]>([
    '',
    '',
  ]);

  const { isAuthFormOpen, authDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const router = useRouter();
  return (
    <motion.div
      className={styles.Content}
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'selection' ? 'center' : 'enter'}
      style={{ zIndex: authType == 'selection' ? 1 : -1 }}
    >
      <div className={styles.AuthorizationFormWrapper}>
        <form
          className={styles.FormWrapper}
          name="signin"
          onSubmit={handleSignIn({
            email,
            password,
            dispatch,
          })}
        >
          <span>Введите свой логин и пароль, чтобы войти</span>
          <div className={styles.form_inputs_wrapper}>
            <div className={styles.AuthInputsWrapper}>
              <input
                className={styles.AuthInput}
                placeholder="Введите Ваш логин"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setAuthPayload([e.target.value.toLowerCase(), password]);
                }}
              />
            </div>
            <div className={styles.AuthInputsWrapper}>
              <input
                className={styles.AuthInput}
                placeholder="Введите Ваш пароль"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setAuthPayload([email, e.target.value]);
                }}
              />
              <Link
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeAuthFormState,
                  changeAuthFormDisplayState,
                  isAuthFormOpen,
                  authDisplay,
                )}
                href="/profile/pswreset"
                prefetch={false}
              >
                <span>Забыли пароль?</span>
              </Link>
              {isAuthFormOpen ||
              router.pathname == '/profile' ||
              router.pathname == '/orders' ? (
                ''
              ) : (
                <span
                  style={{
                    fontSize: '1rem',
                    color: '#476CA9',
                    cursor: 'pointer',
                  }}
                  onClick={() => dispatch(setOneClickBy(true))}
                >
                  Оформить заказ как гость
                </span>
              )}
            </div>
          </div>
          <div className={styles.action_buttons_wrapper}>
            <button
              type={'submit'}
              disabled={
                isEmpty(email) || isEmpty(password) || !isEmail(email)
                  ? true
                  : false
              }
              style={{
                backgroundColor:
                  isEmpty(email) || isEmpty(password) || !isEmail(email)
                    ? color.inactiveIcons
                    : color.buttonPrimary,
              }}
            >
              ВОЙТИ
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignIn;
