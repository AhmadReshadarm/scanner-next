import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HttpStatus } from 'common/enums/httpStatus.enum';
import { Role } from 'common/enums/roles.enum';
import { openSuccessNotification } from 'common/helpers/openSuccessNotidication.helper';
import { openErrorNotification } from 'common/helpers';
import { TAuthState, TUsersQuary } from 'redux/types';
import {
  AuthService,
  User,
  UserHelpDiskService,
  UserService,
  UsersResponses,
  UserVerificationService,
} from 'swagger/services';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import { handlePaginationDataFormatter } from 'redux/helpers';

export const signin = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/signin', async function (payload, { rejectWithValue }): Promise<any> {
  try {
    const resp = await AuthService.signin({
      body: payload,
    });

    if (resp.user.role !== Role.Admin) {
      return rejectWithValue(getErrorMassage(HttpStatus.FORBIDDEN));
    }

    return resp;
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const userSignin = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/userSignin',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await AuthService.signin({
        body: payload,
      });

      // if (response.user.role !== Role.User || response.user.role !== Role.SuperUser) {
      //   return rejectWithValue(getErrorMassage(HttpStatus.FORBIDDEN));
      // }

      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
      // return rejectWithValue(error.response.status);
    }
  },
);

export const signup = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  {
    email: string;
    isSubscribed: boolean;
  },
  { rejectValue: string }
>('auth/signup', async function (payload, { rejectWithValue }): Promise<any> {
  try {
    const repsonse = await AuthService.signup({
      body: payload,
    });

    return repsonse;
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
    // return rejectWithValue(error.response.status);
  }
});

export const verifyUserEmailByToken = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  string,
  { rejectValue: string }
>(
  'auth/verifyUserEmailByToken',
  async function (token, { rejectWithValue }): Promise<any> {
    try {
      const repsonse = await AuthService.confirmEmailByToken({
        token,
      });

      return repsonse;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const sendVerificationToken = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>(
  'auth/sendVerificationToken',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      await UserVerificationService.sendVerificationEmail();
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const resetPswByToken = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  {
    token: string;
    userPassword: string;
  },
  { rejectValue: string }
>(
  'auth/resetPswByToken',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const repsonse = await AuthService.updatePwd({
        body: payload,
      });

      return repsonse;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const sendResetPasswordToken = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  {
    email: string;
  },
  { rejectValue: string }
>(
  'auth/sendResetPasswordToken',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const repsonse = await AuthService.sendRestPasswordToken({
        body: payload,
      });

      return repsonse;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchUserById = createAsyncThunk<
  { user: User },
  {
    userId: string;
  },
  { rejectValue: string }
>(
  'auth/fetchUserById',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await UserService.findUserById({
        userId: payload.userId,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const updateUserById = createAsyncThunk<
  User,
  { userId: string; user: User },
  { rejectValue: string }
>(
  'auth/updateUserById',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await UserService.updateUser({
        userId: payload.userId,
        body: { ...payload.user },
      });
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const session = createAsyncThunk<
  any,
  undefined,
  { rejectValue: string }
>('auth/session', async function (_, { rejectWithValue }): Promise<any> {
  try {
    const response = await getUserInfo();

    // if (response.message == 'rejected') {
    //   return { user: null };
    // }

    return { message: response.message, user: response.user };
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

export const userHelpDisk = createAsyncThunk<
  { user: User },
  { email: string; text: string },
  { rejectValue: string }
>(
  'auth/userHelpDisk',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      await UserHelpDiskService.sendMassege({ body: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchUsers = createAsyncThunk<
  UsersResponses,
  TUsersQuary,
  { rejectValue: string }
>(
  'auth/fetchUsers',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await UserService.getUsers(payload);
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const createUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'auth/createUser',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await UserService.createUser({ body: payload });
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('auth/deleteUser', async function (id, { rejectWithValue }): Promise<any> {
  try {
    return await UserService.deleteUser({ userId: id });
  } catch (error: any) {
    return rejectWithValue(getErrorMassage(error.response.status));
  }
});

const initialState: TAuthState = {
  user: null,
  loading: false,
  serverErr: undefined,
  users: [],
};

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout(state: TAuthState) {
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setUser(state: TAuthState, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearServerErr(state: TAuthState) {
      state.serverErr = undefined;
    },
    clearUsers(state: TAuthState) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(signin.pending, handlePending)
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Вы успешно авторизованы!');
      })
      .addCase(signin.rejected, handleError)
      //userSignin
      .addCase(userSignin.pending, handlePending)
      .addCase(userSignin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Вы успешно авторизованы!');
        state.serverErr = undefined;
      })
      .addCase(userSignin.rejected, handleError)
      //  userSignin.rejected,
      //   (state, action: PayloadAction<any, any, any, any>) => {
      //     state.loading = false;
      //     state.serverErr = action.payload;
      //   },
      //signup
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Мы отправили вам письмо с логином и паролем');
        openSuccessNotification('Вы успешно авторизованы!');
        state.serverErr = undefined;
      })
      .addCase(
        signup.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          state.loading = false;
          // state.serverErr = action.payload;
        },
      )
      //authorize user
      .addCase(verifyUserEmailByToken.pending, handlePending)
      .addCase(verifyUserEmailByToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Вы успешно авторизованы!');
        state.serverErr = undefined;
      })
      .addCase(verifyUserEmailByToken.rejected, handleError)
      //send reset verification token
      .addCase(sendVerificationToken.pending, handlePending)
      .addCase(sendVerificationToken.fulfilled, (state, action) => {
        state.loading = false;
        openSuccessNotification(
          'Мы отправили вам электронное письмо. Пожалуйста, нажмите ссылку «Подтвердить Email»',
        );
        state.serverErr = undefined;
      })
      .addCase(sendVerificationToken.rejected, handleError)
      //reset password by token
      .addCase(resetPswByToken.pending, handlePending)
      .addCase(resetPswByToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        openSuccessNotification('Ваш пароль был сброшен!');
        state.serverErr = undefined;
      })
      .addCase(resetPswByToken.rejected, handleError)
      //send reset password token to email
      .addCase(sendResetPasswordToken.pending, handlePending)
      .addCase(sendResetPasswordToken.fulfilled, (state, action) => {
        state.loading = false;
        openSuccessNotification(
          'Мы отправили вам электронное письмо. Пожалуйста, нажмите ссылку «сбросить пароль», чтобы сбросить пароль.',
        );
        state.serverErr = undefined;
      })
      .addCase(sendResetPasswordToken.rejected, handleError)
      //get user by id
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.serverErr = undefined;
      })
      .addCase(
        fetchUserById.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          openErrorNotification(getErrorMassage(action.payload));
          state.serverErr = action.payload;
          state.user = null;
          state.loading = false;
        },
      )
      //get updateUserById
      .addCase(updateUserById.pending, handlePending)
      .addCase(updateUserById.fulfilled, (state, action) => {
        openSuccessNotification('Информация о пользователе обновлена');
        state.user = action.payload;
        state.loading = false;
        state.serverErr = undefined;
      })
      .addCase(
        updateUserById.rejected,
        (state, action: PayloadAction<any, any, any, any>) => {
          openErrorNotification(getErrorMassage(action.payload));
          state.loading = false;
        },
      )
      //check for token session
      .addCase(session.pending, handlePending)
      .addCase(session.fulfilled, (state, action) => {
        if (action.payload.message == 'fulfilled') {
          state.user = action.payload.user;
          state.loading = false;
          return;
        }
        if (action.payload.message == 'retrying') {
          state.loading = false;
          return;
        }
        if (action.payload.message == 'rejected') {
          state.user = null;
          state.loading = false;
        }
      })
      .addCase(session.rejected, handleError)
      //send email to admin about an error by users
      .addCase(userHelpDisk.pending, handlePending)
      .addCase(userHelpDisk.fulfilled, (state, action) => {
        openSuccessNotification(
          'Мы получили ваше сообщение и свяжемся с вами как можно скорее',
        );
        state.loading = false;
      })
      .addCase(userHelpDisk.rejected, handleError)
      //fetchUsers
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = handlePaginationDataFormatter(action);
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, handleError)
      //createUser
      .addCase(createUser.pending, handlePending)
      .addCase(createUser.fulfilled, (state, action) => {
        // state.users = handlePaginationDataFormatter(action);
        openSuccessNotification('Пользователь успешно создан');
        state.loading = false;
      })
      .addCase(createUser.rejected, handleError)
      //deleteUser
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        // state.users = handlePaginationDataFormatter(action);

        openSuccessNotification('Пользователь успешно удален');
        state.loading = false;
      })
      .addCase(deleteUser.rejected, handleError);
  },
});

export const { signout, setUser, clearServerErr, clearUsers } =
  authSlicer.actions;

export default authSlicer.reducer;
