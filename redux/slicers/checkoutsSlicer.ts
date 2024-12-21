import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import {
  FetchPayload,
  RequestResponse,
  TCheckoutState,
} from '../../redux/types';
import {
  Checkout,
  CheckoutService,
  CheckoutAllService,
} from 'swagger/services';
import { handlePaginationDataFormatter } from 'redux/helpers';
import { CheckoutStatus } from 'common/enums/checkoutStatus.enum';

export const fetchCheckouts = createAsyncThunk<
  RequestResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'checkouts/fetchCheckouts',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutService.getCheckouts({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchCheckoutsAll = createAsyncThunk<
  RequestResponse,
  { limit: string; offset?: string; userId?: string },
  { rejectValue: string }
>(
  'checkouts/fetchCheckouts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutAllService.getCheckoutsAll({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchCheckoutById = createAsyncThunk<
  Checkout,
  { checkoutId: string },
  { rejectValue: string }
>(
  'checkouts/fetchCheckoutById',
  async function ({ checkoutId }, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutService.findCheckoutById({
        checkoutId,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateCheckout = createAsyncThunk<
  Checkout,
  { checkoutId: string; status: CheckoutStatus },
  { rejectValue: string }
>(
  'checkouts/updateCheckout',
  async function ({ checkoutId, status }, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutService.updateCheckout({
        checkoutId,
        body: { status },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteCheckout = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'checkouts/deleteCheckout',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await CheckoutService.deleteCheckout({ checkoutId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TCheckoutState = {
  checkout: {},
  checkouts: [],
  loading: false,
  saveLoading: false,
};

const checkoutsSlicer = createSlice({
  name: 'checkouts',
  initialState,
  reducers: {
    clearCheckouts(state) {
      state.checkouts = [];
    },
    clearCheckout(state) {
      state.checkout = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCheckouts
      .addCase(fetchCheckouts.pending, handlePending)
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.checkouts = handlePaginationDataFormatter(action);
        state.loading = false;
      })
      .addCase(fetchCheckouts.rejected, handleError)
      //fetchCheckoutById
      .addCase(fetchCheckoutById.pending, handlePending)
      .addCase(fetchCheckoutById.fulfilled, (state, action) => {
        state.checkout = action.payload;
        state.loading = false;
      })
      .addCase(fetchCheckoutById.rejected, handleError)
      //updateCheckout
      .addCase(updateCheckout.pending, handleChangePending)
      .addCase(updateCheckout.fulfilled, (state, action) => {
        state.checkout = action.payload;
        state.saveLoading = false;
      })
      .addCase(updateCheckout.rejected, handleError)
      //deleteCheckout
      .addCase(deleteCheckout.pending, handleChangePending)
      .addCase(deleteCheckout.fulfilled, (state, action) => {
        state.checkouts = state.checkouts.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Заказ успешно удален');
      })
      .addCase(deleteCheckout.rejected, handleChangeError);
  },
});

export const { clearCheckouts, clearCheckout } = checkoutsSlicer.actions;

export default checkoutsSlicer.reducer;
