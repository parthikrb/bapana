/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAxios, { AxiosInstance, AxiosResponse } from 'axios';
import { snakeToCamel } from './converter';

export const axios: AxiosInstance = baseAxios.create({
  baseURL: `${
    process.env['NX_API_URL']
  }`,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axios.interceptors.response.use(
  (response: AxiosResponse<string, unknown>): any => {
    return snakeToCamel(response);
  }
);

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    request.headers!['Authorization'] = `Bearer ${token}`;
  }
  return request;
});

export default axios;
