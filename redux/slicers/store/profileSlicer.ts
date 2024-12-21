import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TProfileState } from 'redux/types';
import { Review, ReviewService, ReviewDTO } from 'swagger/services';
import {
  getErrorMassage,
  handleError,
  handlePending,
} from '../../../common/helpers';

export const fetchUserReviews = createAsyncThunk<
  { rows: Review[] },
  string,
  { rejectValue: string }
>(
  'profile/fetchUserReviews',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return (await ReviewService.getReviews({
        userId: payload,
        limit: '1000',
      })) as unknown as { rows: Review[] };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateReview = createAsyncThunk<
  Review,
  { reviewId: string; payload: ReviewDTO },
  { rejectValue: string }
>(
  'productInfo/updateReview',
  async function ({ reviewId, payload }, { rejectWithValue }): Promise<any> {
    try {
      const updated = await ReviewService.updateReview({
        reviewId,
        body: payload,
      });

      return updated;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TProfileState = {
  reviews: [],
  loading: false,
  saveLoading: false,
};

const profileSlicer = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchUserReviews
      .addCase(fetchUserReviews.pending, handlePending)
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.rows;
        state.loading = false;
      })
      .addCase(fetchUserReviews.rejected, handleError)
      //updateReview
      .addCase(updateReview.pending, handlePending)
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews?.findIndex(
          (review) => review.id == action.payload?.id,
        );
        state.reviews[index] = action.payload;

        state.loading = false;
      })
      .addCase(updateReview.rejected, handleError);
  },
});

export const {} = profileSlicer.actions;

export default profileSlicer.reducer;
