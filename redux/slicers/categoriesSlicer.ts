import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
  openErrorNotification,
} from '../../common/helpers';
import { PayloadCategory } from 'common/interfaces/payload-category.interface';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { FetchPayload, RequestResponse, TCategoryState } from 'redux/types';
import { Category, CategoryService } from 'swagger/services';
import { handlePaginationDataFormatter } from 'redux/helpers';

export const fetchCategories = createAsyncThunk<
  RequestResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'categories/fetchCategories',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.getCategories({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchCategory = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>(
  'categories/fetchCategory',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.findCategoryById({ categoryId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createCategory = createAsyncThunk<
  Category,
  PayloadCategory,
  { rejectValue: string }
>(
  'categories/createCategory',
  async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.createCategory({
        body: {
          name: payload.name,
          desc: payload.desc,
          image: payload.image,
          url: payload.url,
          parentId: payload.parent,
          parameters: payload.parameters,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editCategory = createAsyncThunk<
  Category,
  PayloadCategory,
  { rejectValue: string }
>(
  'categories/editCategory',
  async function (payload: PayloadCategory, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.updateCategory({
        categoryId: payload.id as string,
        body: {
          ...payload,
          parentId: payload.parent,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'categories/deleteCategory',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await CategoryService.deleteCategory({ categoryId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TCategoryState = {
  categories: [],
  category: null,
  loading: false,
  saveLoading: false,
};

const categoriesSlicer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories(state) {
      state.categories = [];
    },
    clearCategory(state) {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCategories
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = handlePaginationDataFormatter(action);
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, handleError)
      //fetchCategory
      .addCase(fetchCategory.pending, handlePending)
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategory.rejected, handleError)
      //createCategory
      .addCase(createCategory.pending, handleChangePending)
      .addCase(createCategory.fulfilled, (state) => {
        state.saveLoading = false;
        openSuccessNotification('Категория успешно создана');
      })
      .addCase(createCategory.rejected, handleChangeError)
      //editCategory
      .addCase(editCategory.pending, handleChangePending)
      .addCase(editCategory.fulfilled, (state, action) => {
        let category = state.categories.find(
          (category) => category!.id === action.payload.id,
        );
        category = {
          ...category,
          ...action.payload,
        };
        openSuccessNotification('Категория успешно обновлена');
        state.saveLoading = false;
      })
      .addCase(editCategory.rejected, handleChangeError)
      //deleteCategory
      .addCase(deleteCategory.pending, handleChangePending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item!.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Категория успешно удалена');
      })
      .addCase(deleteCategory.rejected, () => {
        openErrorNotification(
          'Удалить невозможно, В файле есть дополнительные данные',
        );
      });
  },
});

export const { clearCategories, clearCategory } = categoriesSlicer.actions;

export default categoriesSlicer.reducer;
