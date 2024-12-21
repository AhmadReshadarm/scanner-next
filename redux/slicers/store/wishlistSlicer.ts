import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { TWishlistState } from 'redux/types';
import { WishlistService, Wishlist, BasketDTO } from 'swagger/services';

export const createWishlist = createAsyncThunk<
  Wishlist,
  undefined,
  { rejectValue: string }
>(
  'global/createWishlist',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await WishlistService.createWishlist();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchWishlistProducts = createAsyncThunk<
  Wishlist,
  string,
  { rejectValue: string }
>(
  'wishlist/fetchWishlistProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await WishlistService.findWishlistProducts({
        wishlistId: payload,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateWishlist = createAsyncThunk<
  Wishlist,
  Wishlist,
  { rejectValue: string }
>(
  'global/updateWishlist',
  async function (payload: BasketDTO, { rejectWithValue }): Promise<any> {
    try {
      const wishlistId = localStorage.getItem('wishlistId') ?? '';

      return await WishlistService.updateWishlist({
        wishlistId,
        body: payload,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TWishlistState = {
  wishlist: null,
  loading: false,
};

const wishlistSlicer = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createWishlist
      .addCase(createWishlist.pending, handlePending)
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        localStorage.setItem('wishlistId', action.payload.id!);
        state.loading = false;
      })
      .addCase(createWishlist.rejected, handleError)
      //fetchWishlistProducts
      .addCase(fetchWishlistProducts.pending, handlePending)
      .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlistProducts.rejected, (state, action) => {
        state.loading = false;
        localStorage.removeItem('wishlistId');
      })
      //updateWishlist
      .addCase(updateWishlist.pending, handlePending)
      .addCase(updateWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        localStorage.setItem('wishlistId', action.payload.id!);
        state.loading = false;
      })
      .addCase(updateWishlist.rejected, handleError);
  },
});

export const {} = wishlistSlicer.actions;

export default wishlistSlicer.reducer;
