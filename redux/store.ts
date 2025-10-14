import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
// import authReducer from './slicers/authSlicer';
// import categoriesReducer from './slicers/categoriesSlicer';
// import colorsReducer from './slicers/colorsSlicer';
// import brandsReducer from './slicers/brandsSlicer';
// import productsReducer from './slicers/productsSlicer';
// import imagesReducer from './slicers/imagesSlicer';
// import multipleImagesSlicer from './slicers/mutipleImagesSlicer';
import tagsReducer from './slicers/tagsSlicer';
// import sizesReducer from './slicers/sizesSlicer';
// import questionReducer from './slicers/questionSlicer';
// import reviewsReducer from './slicers/reviewsSlicer';
// import globalSlicer from './slicers/store/globalSlicer';
// import globalUISlicer from './slicers/store/globalUISlicer';
// import checkoutsReducer from './slicers/checkoutsSlicer';
// import cartSlicer from './slicers/store/cartSlicer';
// import catalogSlicer from './slicers/store/catalogSlicer';
// import analyticsReducer from './slicers/analyticsSlicer';
// import productInfoSlicer from './slicers/store/productInfoSlicer';
// import homePageSlicer from './slicers/store/homePageSlicer';
// import bannersReducer from './slicers/bannersSlicer';
// import storeCheckoutSlicer from './slicers/store/checkoutSlicer';
// import wishlistSlicer from './slicers/store/wishlistSlicer';
// import profileSlicer from './slicers/store/profileSlicer';
// import newsSlicer from './slicers/newsSlicer';
// import subscriberSlicer from './slicers/subscriberSlicer';
import scannerSlicer from './slicers/scannerSlicer';

const combinedReducer = combineReducers({
  // categories: categoriesReducer,
  // auth: authReducer,
  // colors: colorsReducer,
  // brands: brandsReducer,
  // products: productsReducer,
  // images: imagesReducer,
  // multipleImages: multipleImagesSlicer,
  tags: tagsReducer,
  // sizes: sizesReducer,
  // // questions: questionReducer,
  // reviews: reviewsReducer,
  // checkouts: checkoutsReducer,
  // // analytics: analyticsReducer,
  // banners: bannersReducer,
  // // newsPosts: newsSlicer,
  // subscribers: subscriberSlicer,

  // global: globalSlicer,
  // globalUI: globalUISlicer,
  // cart: cartSlicer,
  // catalog: catalogSlicer,
  // productInfo: productInfoSlicer,
  // homePage: homePageSlicer,
  // storeCheckout: storeCheckoutSlicer,
  // wishlist: wishlistSlicer,
  // profile: profileSlicer,
  scanner: scannerSlicer,
});

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction,
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  } as never);

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
