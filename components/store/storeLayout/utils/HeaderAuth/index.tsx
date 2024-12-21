import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { outsideClickListnerRedux } from 'components/store/storeLayout/helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { TAuthState, TGlobalUIState } from 'redux/types';
import { UsePagination } from './authorize/helpers';
import { session } from 'redux/slicers/authSlicer';
import {
  changeAuthFormDisplayState,
  changeAuthFormState,
} from 'redux/slicers/store/globalUISlicer';
import styles from '../../styles/headerAuth.module.css';
import dynamic from 'next/dynamic';
const Authorization = dynamic(() => import('./authorize'), {
  ssr: false,
});
const Profile = dynamic(() => import('./Profile').then((mod) => mod.Profile), {
  ssr: false,
});

type Props = {
  authButtonRef: HTMLDivElement | any;
  windowWidth: number;
};

const Authorize: React.FC<Props> = ({ authButtonRef, windowWidth }) => {
  const dispatch = useAppDispatch();

  // ---------------------- UI hooks ------------------------
  const [direction, authType, paginate] = UsePagination();
  const { isAuthFormOpen, authDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );

  const [authMenuRef, setAuthMenuRef] = useState(null);
  const [listening, setListening] = useState(false);
  const authMenuNode = useCallback((node: any) => {
    setAuthMenuRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      authMenuRef,
      authButtonRef,
      dispatch,
      changeAuthFormState,
      changeAuthFormDisplayState,
    ),
  );

  //  ------------------------ end of UI hooks ----------------------------------
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(session());
    }
  }, [isAuthFormOpen]);
  return (
    <>
      <motion.div
        ref={authMenuNode}
        style={{ display: windowWidth < 1024 ? 'none' : authDisplay }}
        animate={isAuthFormOpen ? 'open' : 'close'}
        variants={variants.fadeInReveal}
        className={styles.PopupWrapper}
      >
        {isAuthFormOpen && (
          <>
            <div className={styles.header_authorization_form_background} />
            <motion.div className={styles.AuthContent}>
              {user ? (
                <Profile user={user} direction={direction} />
              ) : (
                <Authorization
                  direction={direction}
                  authType={authType}
                  paginate={paginate}
                />
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Authorize;
