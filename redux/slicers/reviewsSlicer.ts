import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { FetchPayload, RequestResponse, TReviewState } from 'redux/types';
import { Review, ReviewService } from 'swagger/services';
import { handlePaginationDataFormatter } from 'redux/helpers';

export const fetchReviews = createAsyncThunk<
  RequestResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'reviews/fetchReviews',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await ReviewService.getReviews({
        limit: payload?.limit,
        offset: payload?.offset,
        merge: 'true',
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const changeShowOnMain = createAsyncThunk<
  Review,
  { review: Review; showOnMain: boolean },
  { rejectValue: string }
>(
  'reviews/changeShowOnMain',
  async function ({ review, showOnMain }, { rejectWithValue }): Promise<any> {
    try {
      return await ReviewService.updateReview({
        reviewId: review.id!,
        body: {
          rating: review.rating,
          text: review.text,
          images: review.images,
          productId: review.product?.id,
          userId: review.user?.id,
          showOnMain,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'reviews/deleteReview',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await ReviewService.deleteReview({ reviewId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TReviewState = {
  reviews: [],
  loading: false,
  saveLoading: false,
  reviewsLenght: 0,
};

const reviewsSlicer = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews(state) {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchReviews
      .addCase(fetchReviews.pending, handlePending)
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = handlePaginationDataFormatter(action);
        state.reviewsLenght = action.payload.length;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, handleError)
      //deleteReview
      .addCase(deleteReview.pending, handleChangePending)
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Комментарий успешно удален');
      })
      .addCase(deleteReview.rejected, handleChangeError);
  },
});

export const { clearReviews } = reviewsSlicer.actions;

export default reviewsSlicer.reducer;
