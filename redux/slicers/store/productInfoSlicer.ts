import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Reaction } from 'common/enums/reaction.enum';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import {
  quastionsDropdownOption,
  reviewDropdownOption,
} from 'components/store/product/constants';
import { getReactionNumber } from 'components/store/product/reviewsAndQuastions/reviews/helpers';
import { TProductInfoState } from 'redux/types';
import {
  Comment,
  CommentReaction,
  CommentService,
  CreateCommentDTO,
  CreateQuestionCommentDTO,
  Product,
  ProductResponse,
  ProductService,
  Question,
  QuestionComment,
  QuestionDTO,
  QuestionService,
  ReactionQuestion,
  Review,
  ReviewDTO,
  ReviewReaction,
  ReviewService,
} from 'swagger/services';
import {
  getErrorMassage,
  handleChangePending,
  handleError,
  handlePending,
} from '../../../common/helpers';

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  'productInfo/fetchProduct',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.findProductByUrl({ url: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createReviewReaction = createAsyncThunk<
  ReviewReaction,
  { userId: string; reviewId: string; reaction: Reaction },
  { rejectValue: string }
>(
  'productInfo/createReviewReaction',
  async function (
    { userId, reviewId, reaction },
    { rejectWithValue },
  ): Promise<any> {
    try {
      const created = await ReviewService.createReviewReaction({
        body: {
          userId,
          reviewId,
          reaction,
        },
      });

      return created;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteReviewReaction = createAsyncThunk<
  ReviewReaction,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteReviewReaction',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteReviewReaction({
        reactionId: id,
      });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createCommentReaction = createAsyncThunk<
  CommentReaction & { reviewId: string },
  { userId: string; reviewId: string; commentId: string; reaction: Reaction },
  { rejectValue: string }
>(
  'productInfo/createCommentReaction',
  async function (
    { userId, reviewId, commentId, reaction },
    { rejectWithValue },
  ): Promise<any> {
    try {
      const created = await ReviewService.createCommentReaction({
        body: {
          userId,
          commentId,
          reaction,
        },
      });

      return {
        ...created,
        reviewId: reviewId,
      };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteCommentReaction = createAsyncThunk<
  CommentReaction & { reviewId: string },
  { reviewId: string; id: string },
  { rejectValue: string }
>(
  'productInfo/deleteCommentReaction',
  async function ({ reviewId, id }, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteCommentReaction({
        reactionId: id,
      });

      return { ...removed, reviewId };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteReview = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteReview',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteReview({ reviewId: id });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteComment = createAsyncThunk<
  Comment,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteComment',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteComment({ commentId: id });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createReview = createAsyncThunk<
  Review,
  ReviewDTO,
  { rejectValue: string }
>(
  'productInfo/createReview',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.createReview({ body: payload });

      return removed;
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

export const createComment = createAsyncThunk<
  Comment,
  CreateCommentDTO,
  { rejectValue: string }
>(
  'productInfo/createComment',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const created = await CommentService.createComment({ body: payload });

      return created;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateComment = createAsyncThunk<
  Comment[],
  { commentId: string; payload: CreateCommentDTO },
  { rejectValue: string }
>(
  'productInfo/updateComment',
  async function ({ commentId, payload }, { rejectWithValue }): Promise<any> {
    try {
      const updated = await CommentService.updateComment({
        commentId,
        body: payload,
      });

      return updated;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createQuestion = createAsyncThunk<
  Question,
  QuestionDTO,
  { rejectValue: string }
>(
  'productInfo/createQuestion',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const created = await QuestionService.createQuestion({ body: payload });

      return created;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateCommentQuestion = createAsyncThunk<
  QuestionComment[],
  { commentId: string; payload: CreateQuestionCommentDTO },
  { rejectValue: string }
>(
  'productInfo/updateCommentQuestion',
  async function ({ commentId, payload }, { rejectWithValue }): Promise<any> {
    try {
      const updated = await QuestionService.updateQuestionComment({
        commentId,
        body: payload,
      });

      return updated;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteQuestion = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteQuestion',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await QuestionService.deleteQuestion({ questionId: id });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createQuestionReaction = createAsyncThunk<
  ReactionQuestion,
  { userId: string; questionId: string; reaction: Reaction },
  { rejectValue: string }
>(
  'productInfo/createQuestionReaction',
  async function (
    { userId, questionId, reaction },
    { rejectWithValue },
  ): Promise<any> {
    try {
      const created = await QuestionService.createQuestionReaction({
        body: {
          userId,
          questionId,
          reaction,
        },
      });

      return created;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteQuestionReaction = createAsyncThunk<
  ReactionQuestion,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteQuestionReaction',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await ReviewService.deleteQuestionReaction({
        reactionId: id,
      });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createQuestionComment = createAsyncThunk<
  QuestionComment,
  CreateQuestionCommentDTO,
  { rejectValue: string }
>(
  'productInfo/createQuestionComment',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const removed = await QuestionService.createQuestionComment({
        body: payload,
      });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteQuestionComment = createAsyncThunk<
  QuestionComment,
  string,
  { rejectValue: string }
>(
  'productInfo/deleteQuestionComment',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      const removed = await QuestionService.deleteQuestionComment({
        commentId: id,
      });

      return removed;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createQuestionCommentReaction = createAsyncThunk<
  CommentReaction & { questionId: string },
  { userId: string; questionId: string; commentId: string; reaction: Reaction },
  { rejectValue: string }
>(
  'productInfo/createQuestionCommentReaction',
  async function (
    { userId, questionId, commentId, reaction },
    { rejectWithValue },
  ): Promise<any> {
    try {
      const created = await QuestionService.createQuestionCommentReaction({
        body: {
          userId,
          commentId,
          reaction,
        },
      });

      return {
        ...created,
        questionId: questionId,
      };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteQuestionCommentReaction = createAsyncThunk<
  CommentReaction & { questionId: string },
  { questionId: string; id: string },
  { rejectValue: string }
>(
  'productInfo/deleteQuestionCommentReaction',
  async function ({ questionId, id }, { rejectWithValue }): Promise<any> {
    try {
      const removed = await QuestionService.deleteQuestionCommentReaction({
        reactionId: id,
      });

      return { ...removed, questionId };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchProductsWithQuestions = createAsyncThunk<
  ProductResponse,
  { offset: string; limit: number },
  { rejectValue: string }
>(
  'productInfo/fetchProductsWithQuestions',
  async function ({ offset, limit }, { rejectWithValue }): Promise<any> {
    try {
      const response = await ProductService.getProducts({
        offset,
        limit,
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TProductInfoState = {
  product: undefined,
  products: [],
  productsLength: 0,
  loading: false,
  saveLoading: false,
};

const productInfoSlicer = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {
    clearProductInfo(state) {
      state.product = undefined;
    },
    clearProductsWithQuestions(state) {
      state.products = [];
    },
    setProductStateFromServer(state, action) {
      state.product = action.payload;
    },
    sortReviews(state, action) {
      if (
        action.payload === reviewDropdownOption[0] &&
        state.product?.reviews
      ) {
        state.product.reviews = state.product?.reviews?.sort((a, b) => {
          if (new Date(a.createdAt!) > new Date(b.createdAt!)) {
            return -1;
          }
          if (new Date(a.createdAt!) < new Date(b.createdAt!)) {
            return 1;
          }
          return 0;
        });
      }

      if (
        action.payload === reviewDropdownOption[1] &&
        state.product?.reviews
      ) {
        state.product.reviews = state.product?.reviews?.sort((a, b) => {
          if (
            getReactionNumber(a.reactions, Reaction.Like) >=
              getReactionNumber(b.reactions, Reaction.Like) &&
            getReactionNumber(a.reactions, Reaction.Dislike) <=
              getReactionNumber(b.reactions, Reaction.Dislike)
          ) {
            return -1;
          }
          if (
            getReactionNumber(a.reactions, Reaction.Like) <=
              getReactionNumber(b.reactions, Reaction.Like) &&
            getReactionNumber(a.reactions, Reaction.Dislike) >=
              getReactionNumber(b.reactions, Reaction.Dislike)
          ) {
            return 1;
          }
          return 0;
        });
      }

      if (
        action.payload === reviewDropdownOption[2] &&
        state.product?.reviews
      ) {
        state.product.reviews = state.product?.reviews?.sort((a, b) => {
          if (a.rating! > b.rating!) {
            return -1;
          }
          if (a.rating! < b.rating!) {
            return 1;
          }
          return 0;
        });
      }

      if (
        action.payload === reviewDropdownOption[3] &&
        state.product?.reviews
      ) {
        state.product.reviews = state.product?.reviews?.sort((a, b) => {
          if (a.rating! < b.rating!) {
            return -1;
          }
          if (a.rating! > b.rating!) {
            return 1;
          }
          return 0;
        });
      }
    },

    sortQuestions(state, action) {
      if (
        action.payload === quastionsDropdownOption[0] &&
        state.product?.questions
      ) {
        state.product.questions = state.product?.questions?.sort((a, b) => {
          if (new Date(a.createdAt!) > new Date(b.createdAt!)) {
            return -1;
          }
          if (new Date(a.createdAt!) < new Date(b.createdAt!)) {
            return 1;
          }
          return 0;
        });
      }

      if (
        action.payload === quastionsDropdownOption[1] &&
        state.product?.questions
      ) {
        state.product.questions = state.product?.questions?.sort((a, b) => {
          if (
            getReactionNumber(a.reactions, Reaction.Like) >=
              getReactionNumber(b.reactions, Reaction.Like) &&
            getReactionNumber(a.reactions, Reaction.Dislike) <=
              getReactionNumber(b.reactions, Reaction.Dislike)
          ) {
            return -1;
          }
          if (
            getReactionNumber(a.reactions, Reaction.Like) <=
              getReactionNumber(b.reactions, Reaction.Like) &&
            getReactionNumber(a.reactions, Reaction.Dislike) >=
              getReactionNumber(b.reactions, Reaction.Dislike)
          ) {
            return 1;
          }
          return 0;
        });
      }

      if (
        action.payload === quastionsDropdownOption[2] &&
        state.product?.questions
      ) {
        state.product.questions = state.product?.questions?.sort((a, b) => {
          if (a.comments?.length! > b.comments?.length!) {
            return -1;
          }
          if (a.comments?.length! < b.comments?.length!) {
            return 1;
          }
          return 0;
        });
      }

      if (
        action.payload === quastionsDropdownOption[3] &&
        state.product?.questions
      ) {
        state.product.questions = state.product?.questions?.sort((a, b) => {
          if (a.comments?.length! < b.comments?.length!) {
            return -1;
          }
          if (a.comments?.length! > b.comments?.length!) {
            return 1;
          }
          return 0;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchProduct
      .addCase(fetchProduct.pending, handlePending)
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, handleError)
      //createReviewReaction
      .addCase(createReviewReaction.pending, handleChangePending)
      .addCase(createReviewReaction.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload.reviewId,
        );
        review?.reactions?.push(action.payload);
        state.saveLoading = false;
      })
      .addCase(createReviewReaction.rejected, handleError)
      //deleteReviewReaction
      .addCase(deleteReviewReaction.pending, handleChangePending)
      .addCase(deleteReviewReaction.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload.reviewId,
        );
        if (review?.reactions) {
          review.reactions = review?.reactions?.filter(
            (reaction) => reaction.id != action.payload.id,
          );
        }
        state.saveLoading = false;
      })
      .addCase(deleteReviewReaction.rejected, handleError)
      //createCommentReaction
      .addCase(createCommentReaction.pending, handleChangePending)
      .addCase(createCommentReaction.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload.reviewId,
        );
        const comment = review?.comments?.find(
          (comment) => comment.id == action.payload.commentId,
        );

        if (comment?.reactions) {
          comment?.reactions?.push(action.payload);
        }

        state.saveLoading = false;
      })
      .addCase(createCommentReaction.rejected, handleError)
      //deleteCommentReaction
      .addCase(deleteCommentReaction.pending, handleChangePending)
      .addCase(deleteCommentReaction.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload.reviewId,
        );
        const comment = review?.comments?.find(
          (comment) => comment.id == action.payload.commentId,
        );

        if (comment?.reactions) {
          comment.reactions = comment?.reactions?.filter(
            (reaction) => reaction.id != action.payload.id,
          );
        }

        state.saveLoading = false;
      })
      .addCase(deleteCommentReaction.rejected, handleError)
      //deleteReview
      .addCase(deleteReview.pending, handleChangePending)
      .addCase(deleteReview.fulfilled, (state, action) => {
        if (state.product?.reviews) {
          state.product.reviews = state.product?.reviews.filter(
            (review) => review.id != action.payload.id,
          );
        }

        state.saveLoading = false;
      })
      .addCase(deleteReview.rejected, handleError)
      //deleteComment
      .addCase(deleteComment.pending, handleChangePending)
      .addCase(deleteComment.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload.review!.id,
        );
        if (review?.comments) {
          review.comments = review?.comments.filter(
            (comment) => comment.id != action.payload.id,
          );
        }

        state.saveLoading = false;
      })
      .addCase(deleteComment.rejected, handleError)
      //createReview
      .addCase(createReview.pending, handleChangePending)
      .addCase(createReview.fulfilled, (state, action) => {
        if (state.product?.reviews) {
          state.product?.reviews!.push(action.payload);
        }
        openSuccessNotification('Спасибо за ваш обзор');
        state.saveLoading = false;
      })
      .addCase(createReview.rejected, handleError)
      //updateReview
      .addCase(updateReview.pending, handleChangePending)
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.product?.reviews?.findIndex(
          (review) => review.id == action.payload?.id,
        );
        if (state.product?.reviews && index) {
          state.product.reviews[index] = action.payload;
        }
        state.saveLoading = false;
      })
      .addCase(updateReview.rejected, handleError)
      //createComment
      .addCase(createComment.pending, handleChangePending)
      .addCase(createComment.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload.review?.id,
        );
        if (review?.comments) {
          review.comments.push(action.payload);
        }
        state.saveLoading = false;
      })
      .addCase(createComment.rejected, handleError)
      //updateComment
      .addCase(updateComment.pending, handleChangePending)
      .addCase(updateComment.fulfilled, (state, action) => {
        const review = state.product?.reviews?.find(
          (review) => review.id == action.payload[0].review?.id,
        );

        if (review?.comments) {
          review.comments = action.payload;
        }
        state.saveLoading = false;
      })
      .addCase(updateComment.rejected, handleError)
      //createQuestion
      .addCase(createQuestion.pending, handleChangePending)
      .addCase(createQuestion.fulfilled, (state, action) => {
        if (state.product?.questions) {
          state.product.questions.push(action.payload);
        }

        state.saveLoading = false;
        openSuccessNotification('Мы получили ваш вопрос');
      })
      .addCase(createQuestion.rejected, handleError)
      //updateQuestion
      .addCase(updateCommentQuestion.pending, handleChangePending)
      .addCase(updateCommentQuestion.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload[0].question?.id,
        );

        if (question?.comments) {
          question.comments = action.payload;
        }
        state.saveLoading = false;
      })
      .addCase(updateCommentQuestion.rejected, handleError)
      //deleteQuestion
      .addCase(deleteQuestion.pending, handleChangePending)
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        if (state.product?.questions) {
          state.product.questions = state.product?.questions.filter(
            (question) => question.id != action.payload.id,
          );
        }
        state.saveLoading = false;
      })
      .addCase(deleteQuestion.rejected, handleError)
      //createQuestionReaction
      .addCase(createQuestionReaction.pending, handleChangePending)
      .addCase(createQuestionReaction.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload.questionId,
        );
        question?.reactions?.push(action.payload);
        state.saveLoading = false;
      })
      .addCase(createQuestionReaction.rejected, handleError)
      //deleteQuestionReaction
      .addCase(deleteQuestionReaction.pending, handleChangePending)
      .addCase(deleteQuestionReaction.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload.questionId,
        );
        if (question?.reactions) {
          question.reactions = question?.reactions?.filter(
            (reaction) => reaction.id != action.payload.id,
          );
        }
        state.saveLoading = false;
      })
      .addCase(deleteQuestionReaction.rejected, handleError)
      //createQuestionComment
      .addCase(createQuestionComment.pending, handleChangePending)
      .addCase(createQuestionComment.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload.question?.id,
        );
        if (question?.comments) {
          question.comments.push(action.payload);
        }
        state.saveLoading = false;
      })
      .addCase(createQuestionComment.rejected, handleError)
      //deleteQuestionComment
      .addCase(deleteQuestionComment.pending, handleChangePending)
      .addCase(deleteQuestionComment.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload.question!.id,
        );
        if (question?.comments) {
          question.comments = question?.comments.filter(
            (comment) => comment.id != action.payload.id,
          );
        }

        state.saveLoading = false;
      })
      .addCase(deleteQuestionComment.rejected, handleError)
      //createQuestionCommentReaction
      .addCase(createQuestionCommentReaction.pending, handleChangePending)
      .addCase(createQuestionCommentReaction.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload.questionId,
        );
        const comment = question?.comments?.find(
          (comment) => comment.id == action.payload.commentId,
        );

        if (comment?.reactions) {
          comment?.reactions?.push(action.payload);
        }

        state.saveLoading = false;
      })
      .addCase(createQuestionCommentReaction.rejected, handleError)
      //deleteCommentReaction
      .addCase(deleteQuestionCommentReaction.pending, handleChangePending)
      .addCase(deleteQuestionCommentReaction.fulfilled, (state, action) => {
        const question = state.product?.questions?.find(
          (question) => question.id == action.payload.questionId,
        );
        const comment = question?.comments?.find(
          (comment) => comment.id == action.payload.commentId,
        );

        if (comment?.reactions) {
          comment.reactions = comment?.reactions?.filter(
            (reaction) => reaction.id != action.payload.id,
          );
        }

        state.saveLoading = false;
      })
      .addCase(deleteQuestionCommentReaction.rejected, handleError)
      //fetchProductsWithQuestions
      .addCase(fetchProductsWithQuestions.pending, handlePending)
      .addCase(fetchProductsWithQuestions.fulfilled, (state, action) => {
        state.products = action.payload.rows!;
        state.productsLength = action.payload.length!;

        state.loading = false;
      })
      .addCase(fetchProductsWithQuestions.rejected, handleError);
  },
});

export const {
  clearProductInfo,
  setProductStateFromServer,
  clearProductsWithQuestions,
  sortReviews,
  sortQuestions,
} = productInfoSlicer.actions;

export default productInfoSlicer.reducer;
