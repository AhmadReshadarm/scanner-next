import color from 'components/store/lib/ui.colors';
import { useEffect, useState, useCallback } from 'react';
import { outsideClickListnerRedux } from 'components/store/storeLayout/helpers';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeSearchQuery,
  clearSearchQuery,
  clearSearchProducts,
  searchProducts,
} from 'redux/slicers/store/globalSlicer';
import { TGlobalState, TGlobalUIState } from 'redux/types';
import { handleSearchFormSubmit } from './helpers';
import { useRouter } from 'next/router';
import {
  changeSearchDisplayState,
  changeSearchFormState,
} from 'redux/slicers/store/globalUISlicer';
import { getAnimationDelay } from 'ui-kit/products/helpers';
import debounce from 'lodash/debounce';
import styles from '../../styles/searchBar.module.css';
import dynamic from 'next/dynamic';
const ProductItem = dynamic(() => import('ui-kit/products/productItem'), {
  ssr: false,
});
type Props = {
  searchButtonRef: HTMLDivElement | any;
  windowWidth: number;
};

const SearchBar: React.FC<Props> = ({ searchButtonRef, windowWidth }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchQuery, products, productsLoading } =
    useAppSelector<TGlobalState>((state) => state.global);
  const { isSearchFormActive, searchDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  useEffect(() => {
    dispatch(changeSearchQuery(router.query.name as string));
  }, [router.query.name]);

  // -------------------  UI hooks -----------------------------
  const [searchWrapperRef, setsearchWrapperRef] = useState(null);
  const [listening, setListening] = useState(false);
  const searchWrapperNode = useCallback((node: any) => {
    setsearchWrapperRef(node);
  }, []);

  useEffect(
    outsideClickListnerRedux(
      listening,
      setListening,
      searchWrapperRef,
      searchButtonRef,
      dispatch,
      changeSearchFormState,
      changeSearchDisplayState,
    ),
  );
  useEffect(() => {
    if (!isSearchFormActive) {
      dispatch(clearSearchQuery());
      dispatch(clearSearchProducts());
    }
  }, [isSearchFormActive]);
  const delay = getAnimationDelay(products.length);
  // --------------------- end of UI hooks -------------------------

  const delayedChange = useCallback(
    debounce((values) => handleSearchQueryWithdelay(values), 500),
    [],
  );

  const handleSearchQueryWithdelay = (searchQuery) => {
    const payload = {
      name: searchQuery,
      artical: searchQuery,
      limit: 100,
    };

    dispatch(searchProducts(payload));
  };

  const handleChangeOnquary = (evt) => {
    dispatch(changeSearchQuery(evt.target.value));

    if (!evt.target.value || evt.target.value == '') {
      dispatch(clearSearchProducts());

      return;
    }
    delayedChange(evt.target.value);
  };

  return (
    <div
      style={{
        display: windowWidth < 1024 ? 'none' : searchDisplay,
      }}
      ref={searchWrapperNode}
      className={styles.SearchFormWrapper}
    >
      {isSearchFormActive && (
        <>
          <div className={styles.header_Search_background}></div>
          <form
            name="search"
            onSubmit={handleSearchFormSubmit(
              searchQuery,
              router,
              changeSearchFormState,
              changeSearchDisplayState,
              dispatch,
            )}
            className={styles.SearchForm}
          >
            <div
              onClick={() => {
                dispatch(clearSearchQuery());
                dispatch(clearSearchProducts());
              }}
              className={styles.search_header_clear_button}
              style={{ display: searchQuery ? 'flex' : 'none' }}
            >
              <svg
                width="44"
                height="41"
                viewBox="0 0 44 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.7214 29.836L13.2763 10.3907C12.7559 9.87025 11.912 9.8693 11.3907 10.3907C10.8693 10.912 10.8702 11.7559 11.3907 12.2763L30.8358 31.7216C31.3562 32.242 32.2 32.243 32.7214 31.7216C33.2428 31.2002 33.2418 30.3564 32.7214 29.836Z"
                  fill={color.inactiveIcons}
                />
                <path
                  d="M13.2764 31.7215L32.7217 12.2764C33.2422 11.756 33.2431 10.9122 32.7217 10.3908C32.2004 9.86943 31.3565 9.87037 30.8361 10.3908L11.3908 29.8359C10.8704 30.3564 10.8694 31.2002 11.3908 31.7215C11.9122 32.2429 12.756 32.242 13.2764 31.7215Z"
                  fill={color.inactiveIcons}
                />
              </svg>
            </div>
            <input
              onChange={handleChangeOnquary}
              placeholder="Введите ключевые слова, артикул или символы"
              type="input"
              value={searchQuery}
              className={styles.SearchFieldInput}
            />

            <button className={styles.SearchBtn} type={'submit'}>
              <span>ПОИСК</span>
            </button>
          </form>
          <div
            style={{ display: searchQuery ? 'flex' : 'none' }}
            className={styles.ResultsWrapper}
          >
            <>
              {products.length > 0 ? (
                <ul
                  style={{
                    overflowY: products.length > 2 ? 'scroll' : 'unset',
                  }}
                  className={styles.ResultsContent}
                >
                  {products.map((product, index: number) => {
                    return (
                      <ProductItem
                        key={`search-bar-item-${index}`}
                        product={product}
                        custom={delay[index]}
                      />
                    );
                  })}
                </ul>
              ) : productsLoading ? (
                <div className={styles.EmptyResultAndLoaderWrapper}>
                  <div className={styles.Loader} />
                </div>
              ) : (
                <div className={styles.EmptyResultAndLoaderWrapper}>
                  <span>
                    Такого товара нет в нашем интернет-магазине. Пожалуйста,
                    проверьте внимательнее написание товара.
                  </span>
                </div>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
