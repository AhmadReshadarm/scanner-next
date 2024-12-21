import axios from 'axios';
import { serviceOptions } from 'swagger/services/serviceOptions';
import { getAccessToken, getRefreshToken } from './helpers/jwtToken.helpers';

const defaultOptions = {
  baseURL: '/api',
};

// Create instance
export const axiosInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(async function (config) {
  if (typeof window !== 'undefined') {
    let accessToken = getAccessToken();
    let refreshToken = getRefreshToken();

    if (accessToken === null || refreshToken === null) {
      return config;
    }

    // let response: any;

    // try {
    //   // check for access token session if ended prolong it
    //   await axios.post('/api/auth/session', {
    //     token: accessToken,
    //   });
    // } catch (error: any) {
    //   if (error.response.status === 403) {
    //     try {
    //       // check for refresh token session
    //       response = await axios.post(`/api/auth/token`, {
    //         token: refreshToken,
    //       });
    //       localStorage.setItem('accessToken', response.data.accessToken);
    //       accessToken = response.data.accessToken;
    //     } catch (error: any) {
    //       localStorage.removeItem('accessToken');
    //       localStorage.removeItem('refreshToken');
    //       return config;
    //     }
    //   }
    // }

    config.headers!.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  }

  if (config.data === null) {
    config.data = {};
  }

  return config;
});

serviceOptions.axios = axiosInstance;
