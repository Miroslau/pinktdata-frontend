import axios from 'axios';
import { CURRENT_URL } from '../constants/domains';

const instanceAxios = axios.create({
  baseURL: CURRENT_URL,
  withCredentials: true,
});

instanceAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { instanceAxios };
