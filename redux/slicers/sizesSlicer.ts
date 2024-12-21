import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
  openErrorNotification,
} from '../../common/helpers';
import { PayloadSize } from 'common/interfaces/payload-sizes.interface';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { FetchPayload, RequestResponse, TSizeState } from 'redux/types';
import { Size, SizeService } from 'swagger/services';
import { handlePaginationDataFormatter } from 'redux/helpers';

export const fetchSizes = createAsyncThunk<
  RequestResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'tags/fetchSizes',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await SizeService.getSizes({
        limit: payload?.limit,
        offset: payload?.offset,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchSize = createAsyncThunk<
  Size,
  string,
  { rejectValue: string }
>('tags/fetchSize', async function (id, { rejectWithValue }): Promise<any> {
  try {
    return await SizeService.findSizeById({ sizeId: id });
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const createSize = createAsyncThunk<
  Size,
  PayloadSize,
  { rejectValue: string }
>(
  'tags/createSize',
  async function (payload: PayloadSize, { rejectWithValue }): Promise<any> {
    try {
      return await SizeService.createSize({
        body: {
          name: payload.name,
          url: payload.url,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editSize = createAsyncThunk<
  Size,
  PayloadSize,
  { rejectValue: string }
>(
  'tags/editSize',
  async function (payload: PayloadSize, { rejectWithValue }): Promise<any> {
    try {
      return await SizeService.updateSize({
        sizeId: payload.id as string,
        body: {
          name: payload.name,
          url: payload.url,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteSize = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('tags/deleteSize', async function (id, { rejectWithValue }): Promise<any> {
  try {
    return await SizeService.deleteSize({ sizeId: id });
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

const initialState: TSizeState = {
  sizes: [],
  size: null,
  loading: false,
  saveLoading: false,
};

const sizesSlicer = createSlice({
  name: 'sizes',
  initialState,
  reducers: {
    clearSizes(state) {
      state.sizes = [];
    },
    clearSize(state) {
      state.size = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchSizes
      .addCase(fetchSizes.pending, handlePending)
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.sizes = handlePaginationDataFormatter(action);
        state.loading = false;
      })
      .addCase(fetchSizes.rejected, handleError)
      //fetchSize
      .addCase(fetchSize.pending, handlePending)
      .addCase(fetchSize.fulfilled, (state, action) => {
        state.size = action.payload;
        state.loading = false;
      })
      .addCase(fetchSize.rejected, handleError)
      //createSize
      .addCase(createSize.pending, handleChangePending)
      .addCase(createSize.fulfilled, (state) => {
        state.saveLoading = false;
        openSuccessNotification('Размер успешно создан');
      })
      .addCase(createSize.rejected, handleChangeError)
      //editTag
      .addCase(editSize.pending, handleChangePending)
      .addCase(editSize.fulfilled, (state, action) => {
        let size = state.sizes.find((size) => size.id === action.payload.id);
        size = {
          ...size,
          ...action.payload,
        };
        openSuccessNotification('Размер успешно обновлен');
        state.saveLoading = false;
      })
      .addCase(editSize.rejected, handleChangeError)
      //deleteSize
      .addCase(deleteSize.pending, handleChangePending)
      .addCase(deleteSize.fulfilled, (state, action) => {
        state.sizes = state.sizes.filter((item) => item.id !== action.payload);
        state.saveLoading = false;
        openSuccessNotification('Размер успешно удален');
      })
      .addCase(deleteSize.rejected, () => {
        openErrorNotification(
          'Удалить невозможно, В файле есть дополнительные данные',
        );
      });
  },
});

export const { clearSize, clearSizes } = sizesSlicer.actions;

export default sizesSlicer.reducer;
