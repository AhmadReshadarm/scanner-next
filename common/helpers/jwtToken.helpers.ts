// import * as jwt from 'jsonwebtoken';
// import { User } from 'swagger/services';
import axios from 'axios';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getUserInfo = async () => {
  // const { NEXT_PUBLIC_ACCESS_SECRET_TOKEN } = process.env;
  // const accessToken = localStorage.getItem('accessToken');

  // return jwt.decode<User>(accessToken ?? '', NEXT_PUBLIC_ACCESS_SECRET_TOKEN ?? '');
  if (!window.navigator.onLine) return { message: 'rejected', user: {} };
  let accessToken = getAccessToken();
  let refreshToken = getRefreshToken();
  let response: any;
  if (!accessToken || !refreshToken) return { message: 'rejected', user: {} };
  try {
    // check for access token session if ended prolong it
    response = await axios.post('/api/auth/session', {
      token: accessToken,
    });
    // return response.data;
    return { message: 'fulfilled', user: response.data };
  } catch (error: any) {
    if (error.response.status === 403) {
      try {
        // check for refresh token session
        response = await axios.post(`/api/auth/token`, {
          token: refreshToken,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        getUserInfo();
        return { message: 'retrying' };
      } catch (error: any) {
        if (error.response.status !== 403) {
          getUserInfo();
          return { message: 'retrying' };
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // return error.response;
        return { message: 'rejected' };
      }
    }
    // return error.response;
    if (error.response.status <= 500 && error.response.status !== 401) {
      getUserInfo();
      return { message: 'retrying' };
    }
    return { message: 'rejected' };
  }
};
