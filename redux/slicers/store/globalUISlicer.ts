import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopupDisplay } from 'components/store/storeLayout/constants';

import { TGlobalUIState } from 'redux/types';

const initialState: TGlobalUIState = {
  isCatalogOpen: false,
  isAuthFormOpen: false,
  isBasketOpen: false,
  isWishlistOpen: false,
  isSearchFormActive: false,
  isOrderCallFormActive: false,
  isDropDownOpen: false,
  catelogDisplay: PopupDisplay.None,
  searchDisplay: PopupDisplay.None,
  wishlistDisplay: PopupDisplay.None,
  cartDisplay: PopupDisplay.None,
  authDisplay: PopupDisplay.None,
};

const globalUISlicer = createSlice({
  name: 'globalui',
  initialState,
  reducers: {
    changeCatelogState(state, action: PayloadAction<boolean>) {
      state.isCatalogOpen = action.payload;
    },
    changeAuthFormState(state, action: PayloadAction<boolean>) {
      state.isAuthFormOpen = action.payload;
    },
    changeBasketState(state, action: PayloadAction<boolean>) {
      state.isBasketOpen = action.payload;
    },
    changeWishlistState(state, action: PayloadAction<boolean>) {
      state.isWishlistOpen = action.payload;
    },
    changeSearchFormState(state, action: PayloadAction<boolean>) {
      state.isSearchFormActive = action.payload;
    },
    changeOrderCallFormState(state, action: PayloadAction<boolean>) {
      state.isOrderCallFormActive = action.payload;
    },
    changeDropDownState(state, action: PayloadAction<boolean>) {
      state.isDropDownOpen = action.payload;
    },
    changeCatelogDisplayState(state, action: PayloadAction<PopupDisplay>) {
      state.catelogDisplay = action.payload;
    },
    changeSearchDisplayState(state, action: PayloadAction<PopupDisplay>) {
      state.searchDisplay = action.payload;
    },
    changeWishlistDisplayState(state, action: PayloadAction<PopupDisplay>) {
      state.wishlistDisplay = action.payload;
    },
    changeCartDisplayState(state, action: PayloadAction<PopupDisplay>) {
      state.cartDisplay = action.payload;
    },
    changeAuthFormDisplayState(state, action: PayloadAction<PopupDisplay>) {
      state.authDisplay = action.payload;
    },
  },
});

export const {
  changeCatelogState,
  changeAuthFormState,
  changeBasketState,
  changeWishlistState,
  changeSearchFormState,
  changeOrderCallFormState,
  changeDropDownState,
  changeCatelogDisplayState,
  changeSearchDisplayState,
  changeWishlistDisplayState,
  changeCartDisplayState,
  changeAuthFormDisplayState,
} = globalUISlicer.actions;

export default globalUISlicer.reducer;
