import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getErrorMassage, handlePending } from 'common/helpers';
import { TDeliveryInfo, TOrderInfo, TStoreCheckoutState } from 'redux/types';
import { AddressService, Checkout, CheckoutService } from 'swagger/services';

export const fetchCheckouts = createAsyncThunk<
  Checkout[],
  undefined,
  { rejectValue: string }
>(
  'checkout/fetchCheckouts',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = (await CheckoutService.getCheckouts({
        limit: '1000',
      })) as unknown as { rows: Checkout[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchAddress = createAsyncThunk<
  TDeliveryInfo,
  undefined,
  { rejectValue: string }
>(
  'checkout/fetchAddress',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = (await AddressService.getAddresses({
        limit: '1',
      })) as unknown as { rows: TDeliveryInfo[] };
      return response.rows[0] ?? null;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TStoreCheckoutState = {
  checkouts: [],
  deliveryInfo: null,
  orderInfo: null,
  loading: false,
  saveLoading: false,
};

const storeCheckoutSlicer = createSlice({
  name: 'storeCheckout',
  initialState,
  reducers: {
    setDeliveryInfo(state, action: PayloadAction<TDeliveryInfo>) {
      state.deliveryInfo = action.payload;
    },
    setOrderInfo(state, action: PayloadAction<TOrderInfo>) {
      state.orderInfo = action.payload;
    },
    clearDeliveryInfo(state) {
      state.deliveryInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCheckouts
      .addCase(fetchCheckouts.pending, handlePending)
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.checkouts = action.payload;
        state.loading = false;
      })
      .addCase(fetchCheckouts.rejected, (state, action) => {
        state.checkouts = initialState.checkouts;
        state.loading = false;
      })
      // fetchAddress
      .addCase(fetchAddress.pending, handlePending)
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.deliveryInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearDeliveryInfo, setDeliveryInfo, setOrderInfo } =
  storeCheckoutSlicer.actions;

export default storeCheckoutSlicer.reducer;
