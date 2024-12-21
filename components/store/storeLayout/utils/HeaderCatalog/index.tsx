import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalUIState, TGlobalState } from 'redux/types';
import { outsideClickListnerRedux } from '../../helpers';
import {
  changeCatelogDisplayState,
  changeCatelogState,
} from 'redux/slicers/store/globalUISlicer';
import Image from 'next/image';
import { useInViewportNoDelay } from '../../useInViewport';
import styles from '../../styles/headerCatalog.module.css';
import dynamic from 'next/dynamic';
const CatalogModal = dynamic(() => import('./CatalogModal'), {
  ssr: false,
});
type Props = {
  catelogButtonRef: HTMLDivElement | any;
};

const HeaderCatalog: React.FC<Props> = ({ catelogButtonRef }) => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const [hoveredCategory, setHoveredCategory] = useState('');
  useEffect(() => {
    let isSet = false;
    if (!loading) {
      categories.map((category) => {
        if (!isSet) {
          setHoveredCategory(`/api/images/${category.image}`);
        }
        isSet = true;
      });
    }
  }, [categories]);

  // ------------------------ UI hooks ------------------------
  const { isCatalogOpen, catelogDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const [listening, setListening] = useState(false);
  const [catelogMenuRef, setcatelogMenuRef] = useState(null);
  const catelogMenuNode = useCallback((node: any) => {
    setcatelogMenuRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      catelogButtonRef,
      catelogMenuRef,
      dispatch,
      changeCatelogState,
      changeCatelogDisplayState,
    ),
  );
  const { isInViewport, ref } = useInViewportNoDelay();
  // --------------------- end of UI hooks --------------------

  return (
    <motion.div
      ref={catelogMenuNode}
      style={{ display: catelogDisplay }}
      animate={isCatalogOpen ? 'open' : 'close'}
      variants={variants.fadeInReveal}
      className={styles.CatalogWrapper}
    >
      {isCatalogOpen && (
        <>
          <div className={styles.header_menu_background}></div>
          <div className={styles.catelog_content_wrapper}>
            <div ref={ref} className={styles.category_menu_wrapper}>
              <div className={styles.header_spacer}></div>
              {isInViewport && (
                <CatalogModal setHoveredCategory={setHoveredCategory} />
              )}
            </div>
            <div className={styles.category_image_wrapper}>
              <div className={styles.header_spacer}></div>
              {hoveredCategory !== '' ? (
                <Image
                  src={hoveredCategory}
                  alt={hoveredCategory}
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                />
              ) : (
                <div className={styles.ImageLoader} />
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default HeaderCatalog;
