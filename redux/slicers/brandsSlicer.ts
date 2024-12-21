import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { PayloadBrand } from 'common/interfaces/payload-brand.interface';
import { handlePaginationDataFormatter } from 'redux/helpers';
import { FetchPayload, RequestResponse, TBrandState } from 'redux/types';
import { Brand, BrandService } from 'swagger/services';

import {
  getErrorMassage,
  handleChangeError,
  handleChangePending,
  handleError,
  handlePending,
  openErrorNotification,
} from '../../common/helpers';

export const fetchBrands = createAsyncThunk<
  Brand[],
  FetchPayload,
  { rejectValue: string }
>(
  'brands/fetchBrands',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await BrandService.getBrands({
        limit: payload?.limit,
        offset: payload?.offset,
      });
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchChosenBrand = createAsyncThunk<
  Brand,
  string,
  { rejectValue: string }
>(
  'brands/fetchChosenBrand',
  async function (id, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.findBrandById({ brandId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createBrand = createAsyncThunk<
  Brand,
  PayloadBrand,
  { rejectValue: string }
>(
  'brands/createBrand',
  async function (payload: PayloadBrand, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.createBrand({
        body: {
          name: payload.name,
          url: payload.url,
          image: payload.image,
          showOnMain: payload.showOnMain,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const editBrand = createAsyncThunk<
  Brand,
  PayloadBrand,
  { rejectValue: string }
>(
  'brands/editBrand',
  async function (payload: PayloadBrand, { rejectWithValue }): Promise<any> {
    try {
      return await BrandService.updateBrand({
        brandId: payload.id as string,
        body: {
          name: payload.name,
          url: payload.url,
          image: payload.image,
          showOnMain: payload.showOnMain,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteBrand = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('brands/deleteBrand', async function (id, { rejectWithValue }): Promise<any> {
  try {
    return await BrandService.deleteBrand({ brandId: id });
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

const initialState: TBrandState = {
  brands: [],
  chosenBrand: null,
  loading: false,

  saveLoading: false,
};

const brandsSlicer = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrands(state) {
      state.brands = [];
    },
    clearChosenBrand(state) {
      state.chosenBrand = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchBrands
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, handleError)
      //fetchBrand
      .addCase(fetchChosenBrand.pending, handlePending)
      .addCase(fetchChosenBrand.fulfilled, (state, action) => {
        state.chosenBrand = action.payload;
        state.loading = false;
      })
      .addCase(fetchChosenBrand.rejected, handleError)
      //createBrand
      .addCase(createBrand.pending, handleChangePending)
      .addCase(createBrand.fulfilled, (state) => {
        state.saveLoading = false;
        openSuccessNotification('Бренд успешно создан');
      })
      .addCase(createBrand.rejected, handleChangeError)
      //editBrand
      .addCase(editBrand.pending, handleChangePending)
      .addCase(editBrand.fulfilled, (state, action) => {
        let brand = state.brands.find(
          (brand) => brand.id === action.payload.id,
        );
        brand = {
          ...brand,
          ...action.payload,
        };
        openSuccessNotification('Бренд успешно обновлен');
        state.saveLoading = false;
      })
      .addCase(editBrand.rejected, handleChangeError)
      //deleteColor
      .addCase(deleteBrand.pending, handleChangePending)
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (item) => item.id !== action.payload,
        );
        state.saveLoading = false;
        openSuccessNotification('Бренд успешно удален');
      })
      .addCase(deleteBrand.rejected, () => {
        openErrorNotification(
          'Удалить невозможно, В файле есть дополнительные данные',
        );
      });
  },
});

export const { clearBrands, clearChosenBrand } = brandsSlicer.actions;

export default brandsSlicer.reducer;
