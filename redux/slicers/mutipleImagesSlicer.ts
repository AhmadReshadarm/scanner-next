import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from 'common/axios.instance';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { PayloadCreateImage, TMultipleImageState } from 'redux/types';

import {
  getErrorMassage,
  handleError,
  handlePending,
} from '../../common/helpers';

export const createImage = createAsyncThunk<any, any, { rejectValue: string }>(
  'multipleImages/createImage1',
  async function (
    payload: PayloadCreateImage,
    { rejectWithValue },
  ): Promise<any> {
    try {
      const formData = new FormData();

      formData.append('files', payload.file as any);
      const resp = await axiosInstance.post(
        '/images',
        formData,
        payload.config,
      );
      return { file: resp.data[0], index: payload.index };
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TMultipleImageState = {
  imagesMap: {},
  loading: false,
};

const multipleImagesSlicer = createSlice({
  name: 'multipleImages',
  initialState,
  reducers: {
    setDefaultImageList(state, action) {
      if (!state.imagesMap[action.payload.index]) {
        state.imagesMap[action.payload.index] = [];
      }

      const imagesList = [...state.imagesMap[action.payload.index]];
      imagesList.push(action.payload.file);
      state.imagesMap[action.payload.index] = imagesList;
    },
    removeImageFromList(state, action) {
      const imageList = state.imagesMap[action.payload.index];
      state.imagesMap[action.payload.index] = imageList.filter(
        (item: any) => item.name !== action.payload.name,
      );
    },
    clearImageList(state) {
      state.imagesMap = initialState.imagesMap;
    },
  },
  extraReducers: (builder) => {
    builder
      //createImage
      .addCase(createImage.pending, handlePending)
      .addCase(createImage.fulfilled, (state, action) => {
        const file = state.imagesMap[action.payload.index]?.find(
          (item: any) => item.name === action.meta.arg.file.name,
        ) as any;
        if (file) {
          file.url = `/api/images/${action.payload.file}`;
          file.name = action.payload.file;
        }
        openSuccessNotification('Изображение успешно загружено');
      })
      .addCase(createImage.rejected, handleError);
  },
});

export const { setDefaultImageList, removeImageFromList, clearImageList } =
  multipleImagesSlicer.actions;

export default multipleImagesSlicer.reducer;
