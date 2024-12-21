import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getErrorMassage,
  handleChangePending,
  handlePending,
  handleError,
  handleChangeError,
} from '../../common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { FetchPayload, RequestResponse, TBannerState } from 'redux/types';
import {
  Advertisement,
  Slide,
  AdvertisementService,
  SlideService,
  SlideDTO,
} from 'swagger/services';

export const fetchAdvertisement = createAsyncThunk<
  RequestResponse,
  undefined,
  { rejectValue: string }
>(
  'banners/fetchAdvertisement',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      return await AdvertisementService.getAdvertisements();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateAdvertisement = createAsyncThunk<
  Advertisement,
  Advertisement,
  { rejectValue: string }
>(
  'banners/updateAdvertisement',
  async function (payload: Advertisement, { rejectWithValue }): Promise<any> {
    try {
      return await AdvertisementService.updateAdvertisement({
        advertisementId: payload.id!,
        body: {
          title: payload.title,
          description: payload.description,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchSlides = createAsyncThunk<
  RequestResponse,
  undefined,
  { rejectValue: string }
>('banners/fetchSlides', async function (_, { rejectWithValue }): Promise<any> {
  try {
    return await SlideService.getSlides();
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const createSlide = createAsyncThunk<
  Slide,
  Slide,
  { rejectValue: string }
>(
  'banners/createSlides',
  async function (payload: Slide, { rejectWithValue }): Promise<any> {
    try {
      return await SlideService.createSlide({
        body: {
          image: payload.image,
          link: payload.link,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateSlides = createAsyncThunk<
  Slide,
  SlideDTO[],
  { rejectValue: string }
>(
  'banners/updateSlides',
  async function (payload: SlideDTO[], { rejectWithValue }): Promise<any> {
    try {
      return await SlideService.updateSlides({
        body: payload,
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TBannerState = {
  advertisement: [],
  slides: [],
  loading: false,
  advertisementLoading: false,
  saveLoading: false,
};

const bannersSlicer = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    addSlide(state, action) {
      state.slides.push(action.payload);
    },
    removeSlide(state, action) {
      state.slides.splice(action.payload, 1);
    },
    clearBanners(state) {
      state.advertisement = [];
      state.slides = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchAdvertisement
      .addCase(fetchAdvertisement.pending, (state, action) => {
        state.advertisementLoading = true;
      })
      .addCase(fetchAdvertisement.fulfilled, (state, action) => {
        state.advertisement = action.payload as unknown as Advertisement[];
        state.advertisementLoading = false;
      })
      .addCase(fetchAdvertisement.rejected, handleError)
      //updateAdvertisement
      .addCase(updateAdvertisement.pending, handlePending)
      .addCase(updateAdvertisement.fulfilled, (state, action) => {
        state.advertisement = action.payload as unknown as Advertisement[];
        state.saveLoading = false;
        openSuccessNotification('Баннер успешно обновлен');
      })
      .addCase(updateAdvertisement.rejected, handleChangeError)
      //fetchSlides
      .addCase(fetchSlides.pending, handlePending)
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.slides = action.payload as unknown as Slide[];
        state.loading = false;
      })
      .addCase(fetchSlides.rejected, handleError)
      //createSlides
      .addCase(createSlide.pending, handlePending)
      .addCase(createSlide.fulfilled, (state, action) => {
        state.saveLoading = false;
        openSuccessNotification('Баннер успешно создан');
      })
      .addCase(createSlide.rejected, handleChangeError)
      //updateSlides
      .addCase(updateSlides.pending, handlePending)
      .addCase(updateSlides.fulfilled, (state, action) => {
        state.slides = action.payload as unknown as Slide[];
        state.saveLoading = false;
        openSuccessNotification('Баннер успешно обновлен');
      })
      .addCase(updateSlides.rejected, handleChangeError);
  },
});

export const { clearBanners, addSlide, removeSlide } = bannersSlicer.actions;

export default bannersSlicer.reducer;
