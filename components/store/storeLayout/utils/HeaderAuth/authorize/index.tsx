import { paginateTo } from 'components/store/checkout/constant';
import { motion } from 'framer-motion';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { PopupDisplay } from '../../../constants';
import SignIn from './signin';
import SignUp from './signup';
import { useState } from 'react';
import styles from '../../../styles/headerAuth.module.css';
type Props = {
  direction: number;
  authType: string;
  paginate: (newDirection: number, newType: any) => void;
};

const Authorization: React.FC<Props> = ({ direction, authType, paginate }) => {
  const { loading } = useAppSelector<TAuthState>((state) => state.auth);
  const [isHelperActive, setIshelperActive] = useState(true);

  return (
    <>
      <div className={styles.AuthorizationWrapper}>
        <div className={styles.auth_intial_image_wrapper}>
          <img src="/singin-static.jpg" alt="sofa" />
        </div>
        <div className={styles.auth_parrent_wrapper}>
          <div className={styles.AuthHeader}>
            <div className={styles.AuthTabWrapper}>
              <motion.div
                animate={authType == 'selection' ? 'init' : 'animate'}
                variants={{ init: { x: 0 }, animate: { x: 100 } }}
                className={styles.auth_page_indecator}
              ></motion.div>

              <div className={styles.auth_buttons_row}>
                <div
                  style={{
                    display:
                      authType !== 'signup' && isHelperActive ? 'flex' : 'none',
                  }}
                  className={styles.helper_box_wrapper}
                >
                  <div className={`${styles.box} ${styles.arrow_top}`}>
                    <span
                      className={styles.helper_close_btn}
                      onClick={() => setIshelperActive(false)}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="1"
                          y1="-1"
                          x2="26.3541"
                          y2="-1"
                          transform="matrix(0.683484 -0.729965 0.681649 0.731679 1.52267 21.0312)"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <line
                          x1="1"
                          y1="-1"
                          x2="26.3044"
                          y2="-1"
                          transform="matrix(0.680786 0.732483 -0.684345 0.729158 0.21875 1.03125)"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <span>
                      Если у вас нет аккаунт, нажмите здесь чтобы создать новую
                      аккаунт
                    </span>
                  </div>
                </div>
                <h2
                  className={`${
                    authType == 'selection' ? styles.sign_in_tab : ''
                  } `}
                  onClick={() => paginate(paginateTo.forward, 'selection')}
                >
                  ВХОД
                </h2>
                <span>/</span>
                <h2
                  className={`${
                    authType == 'signup' ? styles.sign_up_tab : ''
                  }`}
                  onClick={() => paginate(paginateTo.back, 'signup')}
                >
                  РЕГИСТРАЦИЯ
                </h2>
              </div>
            </div>
          </div>
          <SignIn direction={direction} authType={authType} />
          <SignUp
            direction={direction}
            authType={authType}
            paginate={paginate}
          />
          <div
            className={styles.Loading}
            style={{
              display: loading ? PopupDisplay.Flex : PopupDisplay.None,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Authorization;
