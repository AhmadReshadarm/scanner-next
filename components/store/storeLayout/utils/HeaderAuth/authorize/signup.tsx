import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail'; // docs: https://www.npmjs.com/package/validator
import isEmpty from 'validator/lib/isEmpty';
import variants from 'components/store/lib/variants';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { handleSignUp } from './helpers';
import color from 'components/store/lib/ui.colors';
import { setOneClickBy } from 'redux/slicers/store/cartSlicer';
import { TGlobalUIState } from 'redux/types';
import { useRouter } from 'next/router';
import styles from '../../../styles/singIn-singUp.module.css';
import { motion } from 'framer-motion';

type Props = {
  direction: number;
  authType: string;
  paginate: any;
};
const SignUp: React.FC<Props> = ({ direction, authType, paginate }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [isSubscribed, setSbuscribed] = useState(true);
  const { isAuthFormOpen } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const router = useRouter();
  return (
    <motion.div
      className={styles.Content}
      dragConstraints={{ left: 0, right: 0 }}
      custom={direction}
      variants={variants.authorizeSlideX}
      animate={authType == 'signup' ? 'center' : 'enter'}
      style={{ zIndex: authType == 'signup' ? 1 : -1 }}
    >
      <div className={styles.AuthorizationFormWrapper}>
        <form
          className={styles.FormWrapper}
          name="singup"
          onSubmit={handleSignUp(email, isSubscribed, paginate, dispatch)}
        >
          <span>Логин и пароль будут отправлены вам на электронную почту</span>
          <div className={styles.AuthInputsWrapper}>
            <input
              className={styles.AuthInput}
              placeholder="Эл. адрес"
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />

            <div
              onClick={() => setSbuscribed((prev) => !prev)}
              className={styles.newsletter_wrapper}
            >
              <input type="checkbox" name="newsletter" checked={isSubscribed} />
              <label htmlFor="newsletter">
                Подписаться на новостную рассылку
              </label>
            </div>
            {isAuthFormOpen || router.pathname == '/profile' ? (
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
          <div className={styles.action_buttons_wrapper}>
            <button
              type={'submit'}
              disabled={isEmpty(email) || !isEmail(email)}
              style={{
                backgroundColor:
                  isEmpty(email) || !isEmail(email)
                    ? color.inactiveIcons
                    : color.buttonPrimary,
              }}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
