import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { FetchPayload, TQuestionState } from 'redux/types';
import { Question, QuestionResponse, QuestionService } from 'swagger/services';
import { quastionsDropdownOption } from 'components/store/product/constants';
import { getReactionNumber } from 'components/store/product/reviewsAndQuastions/reviews/helpers';
import { Reaction } from 'common/enums/reaction.enum';

export const fetchQuestions = createAsyncThunk<
  QuestionResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'questions/fetchQuestions',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await QuestionService.getQuestions({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchQuestionByID = createAsyncThunk<
  Question,
  { id: string },
  { rejectValue: string }
>(
  'questions/fetchQuestionByID',
  async function ({ id }, { rejectWithValue }): Promise<any> {
    try {
      return await QuestionService.findQuestionById({ questionId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteQuestion = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'questions/deleteQuestion',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await QuestionService.deleteQuestion({ questionId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TQuestionState = {
  questions: [],
  question: undefined,
  loading: false,
  saveLoading: false,
  questionsLenght: 0,
};

const reviewsSlicer = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearQuestions(state) {
      state.questions = [];
    },
    sortQuestionsAdmin(state, action) {
      if (
        action.payload === quastionsDropdownOption[0] &&
        state.question!.product?.questions
      ) {
        state.question!.product.questions =
          state.question!.product?.questions?.sort((a, b) => {
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
        state.question!.product?.questions
      ) {
        state.question!.product.questions =
          state.question!.product?.questions?.sort((a, b) => {
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
        state.question!.product?.questions
      ) {
        state.question!.product.questions =
          state.question!.product?.questions?.sort((a, b) => {
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
        state.question!.product?.questions
      ) {
        state.question!.product.questions =
          state.question!.product?.questions?.sort((a, b) => {
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
      //fetchQuestions
      .addCase(fetchQuestions.pending, handlePending)
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.rows;
        state.questionsLenght = action.payload.length;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, handleError)
      //fetchQuestionByID
      .addCase(fetchQuestionByID.pending, handlePending)
      .addCase(fetchQuestionByID.fulfilled, (state, action) => {
        state.question = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestionByID.rejected, handleError)
      //deleteQuestion
      .addCase(deleteQuestion.pending, handleChangePending)
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions!.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Комментарий успешно удален');
      })
      .addCase(deleteQuestion.rejected, handleChangeError);
  },
});

export const { clearQuestions, sortQuestionsAdmin } = reviewsSlicer.actions;

export default reviewsSlicer.reducer;
