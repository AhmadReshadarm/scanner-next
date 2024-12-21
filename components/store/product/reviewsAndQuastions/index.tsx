import { MutableRefObject, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import { a11yProps } from './helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Product } from 'swagger/services';
import { TAuthState } from 'redux/types';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
import dynamic from 'next/dynamic';
import { setProductStateFromServer } from 'redux/slicers/store/productInfoSlicer';
const Reviews = dynamic(() => import('./reviews'));
const Quastions = dynamic(() => import('./quastions'));
import styles from '../styles/reviewsAndQuestions.module.css';

type Props = {
  reviewRef: MutableRefObject<null>;
  questionRef: MutableRefObject<null>;
  product: Product | undefined;
};
const ReveiwsAndQuastions: React.FC<Props> = ({
  reviewRef,
  questionRef,
  product,
}) => {
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  const { isInViewport, ref } = useInViewport();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setProductStateFromServer(product));
  }, []);
  return (
    <div id="reveiws-quastions" className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Content}>
          <Box
            sx={{
              width: '100%',
            }}
            ref={ref}
          >
            <Box>
              <Tabs value={tab} onChange={handleChange}>
                <Tab
                  ref={reviewRef}
                  label={`${product?.reviews?.length} Отзыв(ов) о товаре`}
                  {...a11yProps(0)}
                />
                <Tab
                  ref={questionRef}
                  label={`${product?.questions?.length} Вопрос(ов) о товаре`}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            {isInViewport ? (
              <>
                <TabPanel value={tab} index={0}>
                  <Reviews />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <Quastions productId={product?.id} userId={user?.id!} />
                </TabPanel>
              </>
            ) : (
              ''
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ReveiwsAndQuastions;
