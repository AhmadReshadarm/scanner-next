import { openErrorNotification } from './openErrorNotification';
import { PayloadAction } from '@reduxjs/toolkit';

const handleError = (state, action: PayloadAction<any, any, any, any>) => {
  state.loading = false;
  openErrorNotification(action.payload);
};

const handleChangeError = (
  state,
  action: PayloadAction<any, any, any, any>,
) => {
  state.saveLoading = false;
  openErrorNotification(action.payload);
};

export { handleError, handleChangeError };
