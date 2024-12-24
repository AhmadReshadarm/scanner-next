import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { TScanner, TScannerPayload } from 'redux/types';
import { Scanner, ScannerService } from 'swagger/services';

export const createScanner = createAsyncThunk<
  Scanner,
  Scanner,
  { rejectValue: string }
>(
  'scanner/createScanner',
  async function (payload: Scanner, { rejectWithValue }): Promise<any> {
    try {
      return await ScannerService.createScanner({ body: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchScanners = createAsyncThunk<
  { rows: Scanner[]; length: number },
  TScannerPayload,
  { rejectValue: string }
>(
  'scanner/fetchScanners',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await ScannerService.getScanners();
      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const updateScanner = createAsyncThunk<
  Scanner,
  Scanner,
  { rejectValue: string }
>(
  'scanner/updateScanner',
  async function ({ id, ...payload }, { rejectWithValue }): Promise<any> {
    try {
      return ScannerService.updateScanner({
        scannerId: id!,
        body: {
          ...payload,
        },
      });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const removeScanner = createAsyncThunk<
  Scanner,
  { id: string },
  { rejectValue: string }
>(
  'scanner/removeScanner',
  async function ({ id }, { rejectWithValue }): Promise<any> {
    try {
      return ScannerService.deleteScanner({ scannerId: id });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

const initialState: TScanner = {
  scanner: null,
  scanners: [],
  length: 0,
  loading: false,
};

const scannerSlicer = createSlice({
  name: 'scanner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createScanner
      .addCase(createScanner.pending, handlePending)
      .addCase(createScanner.fulfilled, (state, action) => {
        state.scanner = action.payload;
        state.loading = false;
      })
      .addCase(createScanner.rejected, handleError)
      //fetchScanners
      .addCase(fetchScanners.pending, handlePending)
      .addCase(fetchScanners.fulfilled, (state, action) => {
        state.scanners = action.payload.rows;
        state.length = action.payload.length;
        state.loading = false;
      })
      .addCase(fetchScanners.rejected, (state, action) => {
        state.loading = false;
        localStorage.removeItem('wishlistId');
      })
      //updateScanner
      .addCase(updateScanner.pending, handlePending)
      .addCase(updateScanner.fulfilled, (state, action) => {
        state.scanner = action.payload;
        state.loading = false;
      })
      .addCase(updateScanner.rejected, handleError)
      //removeScanner
      .addCase(removeScanner.pending, handlePending)
      .addCase(removeScanner.fulfilled, (state, action) => {
        openSuccessNotification(`${action.payload.id} removed`);
        state.loading = false;
      })
      .addCase(removeScanner.rejected, handleError);
  },
});

export const {} = scannerSlicer.actions;

export default scannerSlicer.reducer;
