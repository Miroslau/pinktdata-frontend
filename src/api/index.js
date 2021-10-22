import axios from 'axios';
import { CURRENT_URL } from '../constants/domains';

const instanceAxios = axios.create({
  baseURL: CURRENT_URL,
  withCredentials: true,
});

export const setHttpToken = (token) => {
  instanceAxios.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config;
  });
};

export default instanceAxios;
