import { NextRouter } from 'next/router';
import {
  changeSearchQuery,
  clearSearchProducts,
  clearSearchQuery,
  searchProducts,
} from 'redux/slicers/store/globalSlicer';
import { AppDispatch } from 'redux/store';
import { CategoryInTree } from 'swagger/services';
import { Product } from 'swagger/services';
import { PopupDisplay } from '../../constants';

const handleSearchItemClick = (dispatch: AppDispatch) => () => {
  dispatch(clearSearchProducts());
  dispatch(clearSearchQuery());
};

const handleSearchQueryChange =
  (selected: CategoryInTree | undefined, dispatch: AppDispatch) => (e: any) => {
    const searchQuery = e.target.value;

    dispatch(changeSearchQuery(searchQuery));

    if (!searchQuery || searchQuery == '') {
      dispatch(clearSearchProducts());

      return;
    }

    const payload = {
      name: searchQuery,
      limit: 1000,
    };

    dispatch(searchProducts(payload));
  };

const handleSearchFormSubmit =
  (
    searchQuery: string,
    router: NextRouter,
    changeSearchFormState: any,
    changeSearchDisplayState: any,
    dispatch: AppDispatch,
  ) =>
  (e) => {
    e.preventDefault();

    if (searchQuery == undefined || searchQuery == '') return;

    dispatch(clearSearchQuery());
    dispatch(clearSearchProducts());

    if (searchQuery !== undefined || searchQuery !== '') {
      const query: { name: string; categories?: string } = {
        name: searchQuery,
      };

      router.push({
        pathname: '/catalog',
        query,
      });

      setTimeout(() => {
        dispatch(changeSearchFormState(false));
        setTimeout(() => {
          dispatch(changeSearchDisplayState(PopupDisplay.None));
        }, 100);
      }, 300);
    }
  };

const TrigerhandleWishBtnClick =
  (product: Product, onWishBtnClick: (product: Product) => void) =>
  (evt: any) => {
    evt.preventDefault();
    onWishBtnClick(product);
  };
const TrigerhandleCartBtnClick =
  (product: Product, onCardBtnClick: (product: Product) => void) =>
  (evt: any) => {
    evt.preventDefault();
    onCardBtnClick(product);
  };

export {
  handleSearchItemClick,
  handleSearchQueryChange,
  handleSearchFormSubmit,
  TrigerhandleWishBtnClick,
  TrigerhandleCartBtnClick,
};
