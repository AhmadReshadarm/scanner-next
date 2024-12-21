import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from 'common/axios.instance';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import {
  ImageDTO,
  PayloadCreateImage,
  TImageState,
  FetchPayload,
  // RequestResponse,
} from 'redux/types';
import { Image, ImageService, ImageResponse } from 'swagger/services';
import {
  getErrorMassage,
  handleError,
  handlePending,
  // handleChangePending,
  openErrorNotification,
} from '../../common/helpers';
// import { handlePaginationDataFormatter } from 'redux/helpers';

export const fetchImages = createAsyncThunk<
  ImageResponse,
  FetchPayload,
  { rejectValue: string }
>(
  'images/fetchImages',
  async function (payload: FetchPayload, { rejectWithValue }): Promise<any> {
    try {
      return await ImageService.getImages({
        limit: payload?.limit,
        offset: payload?.offset,
        originalName: payload?.originalName,
        filename: payload.filename,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createImage = createAsyncThunk<
  string,
  PayloadCreateImage,
  { rejectValue: string }
>(
  'images/createImage',
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
      return resp.data[0];
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createSigleImage = createAsyncThunk<
  string,
  PayloadCreateImage,
  { rejectValue: string }
>(
  'images/createSigleImage',
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
      return resp.data[0];
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteImage = createAsyncThunk<
  ImageDTO,
  { fileName: string },
  { rejectValue: ImageDTO }
>(
  'images/deleteImage',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      await ImageService.deleteImageByFileName({
        fileName: payload.fileName,
      });
      return payload.fileName;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: TImageState = {
  imageList: [],
  imageListInDB: [],
  singleImage: '',
  paginationLength: 0,
  loading: false,
};

const imageSlicer = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setDefaultSingleImageList(state, action) {
      if (action.payload.fromDB) {
        state.imageList = [
          ...state.imageList,
          {
            name: action.payload.name as string,
            url: action.payload.url,
            uid: action.payload.slideNum as number,
          },
        ];
      } else if (action.payload.slideNum) {
        state.imageList = [
          ...state.imageList,
          {
            name: action.payload.file.name as string,
            uid: action.payload.slideNum as number,
          },
        ];
      } else {
        state.imageList = [...state.imageList, action.payload];
      }
    },
    removeImageFromList(state, action) {
      state.imageList = state.imageList.filter(
        (item: any) => item.name !== action.payload,
      );
    },
    clearImageList(state) {
      state.imageList = initialState.imageList;
    },
    clearImageDBList(state) {
      state.imageListInDB = [];
    },
    clearSingleImage(state) {
      state.singleImage = '';
    },
  },
  extraReducers: (builder) => {
    builder //fetchImages
      .addCase(fetchImages.pending, handlePending)
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.imageListInDB = action.payload.rows;
        state.paginationLength = action.payload.length;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, handleError)
      //createImage
      .addCase(createImage.pending, handlePending)
      .addCase(createImage.fulfilled, (state, action) => {
        state.loading = false;
        const file = state.imageList.find(
          (item: any) => item.name === action.meta.arg.file.name,
        ) as any;
        if (file) {
          file.url = `/api/images/${action.payload}`;
          file.name = action.payload;
        } else {
          state.imageList.push(action.payload as any);
        }
        openSuccessNotification('Изображение успешно загружено');
      })
      .addCase(createImage.rejected, handleError)
      //createSigleImage
      .addCase(createSigleImage.pending, handlePending)
      .addCase(createSigleImage.fulfilled, (state, action) => {
        state.loading = false;
        state.singleImage = action.payload;
        openSuccessNotification('Изображение успешно загружено');
      })
      .addCase(createSigleImage.rejected, handleError)
      //deleteImage
      .addCase(deleteImage.pending, handlePending)
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.imageListInDB = state.imageListInDB!.filter(
          (item) => item.filename !== action.payload,
        );
        openSuccessNotification('Изображение успешно удален');
        state.loading = false;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        let ids: any = [
          { productIDs: [] },
          { brandIDs: [] },
          { categoryIDs: [] },
        ];

        if (
          action.payload?.products?.length! > 0 ||
          action.payload?.brands?.length! > 0 ||
          action.payload?.categories?.length! > 0
        ) {
          if (action.payload?.products?.length! > 0) {
            action.payload?.products?.rows?.map((product) => {
              ids[0].productIDs.push(product.id);
            });
          }
          if (action.payload?.brands?.length! > 0) {
            action.payload?.brands?.rows?.map((brand) => {
              ids[1].brandIDs.push(brand.id);
            });
          }
          if (action.payload?.categories?.length! > 0) {
            action.payload?.categories?.rows?.map((category) => {
              ids[2].categoryIDs.push(category.id);
            });
          }
          openErrorNotification(
            `Удалить невозможно, Файл используется в ${
              ids[0].productIDs.length > 0 ? 'продуктах с id: ' : ''
            }${ids[0].productIDs}
            ${ids[1].brandIDs.length > 0 ? 'и в бранд с id: ' : ''}
            ${ids[1].brandIDs}
            ${ids[2].categoryIDs.length > 0 ? 'и в каталог с id: ' : ''}
            ${ids[2].categoryIDs}`,
          );
        } else {
          openErrorNotification('Ошибка сервера.');
        }
      });
  },
});

export const {
  setDefaultSingleImageList,
  removeImageFromList,
  clearImageList,
  clearImageDBList,
  clearSingleImage,
} = imageSlicer.actions;

export default imageSlicer.reducer;
