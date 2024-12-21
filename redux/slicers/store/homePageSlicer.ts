import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { Banner, THomePageState } from 'redux/types';
import {
  BrandResponse,
  BrandService,
  ReviewResponse,
  ReviewService,
  SlideService,
} from 'swagger/services';

export const fetchReviews = createAsyncThunk<
  ReviewResponse,
  undefined,
  { rejectValue: string }
>(
  'homePage/fetchReviews',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await ReviewService.getReviews({
        showOnMain: true,
        limit: '1',
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBrands = createAsyncThunk<
  BrandResponse,
  undefined,
  { rejectValue: string }
>(
  'homePage/fetchBrands',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await BrandService.getBrands({
        showOnMain: true,
        limit: '20',
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBanner = createAsyncThunk<
  Banner,
  undefined,
  { rejectValue: string }
>(
  'homePage/fetchBanner',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const [slides] = await Promise.all([SlideService.getSlides()]);

      return {
        slides,
      };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: THomePageState = {
  reviews: [],
  brands: [],
  banner: undefined,
  loading: false,
};

const homePageSlicer = createSlice({
  name: 'homePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchReviews
      .addCase(fetchReviews.pending, handlePending)
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.rows!;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, handleError)
      //fetchBrands
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload.rows!;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, handleError)
      //fetchBrands
      .addCase(fetchBanner.pending, handlePending)
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banner = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanner.rejected, handleError);
  },
});

export const {} = homePageSlicer.actions;

export default homePageSlicer.reducer;
