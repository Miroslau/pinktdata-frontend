import axios from 'axios';
import { CURRENT_URL } from '../constants/domains';

const instanceAxios = axios.create({
  baseURL: CURRENT_URL,
  withCredentials: true,
});

export const setHttpToken = (token) => {
  if (token) {
    instanceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instanceAxios.defaults.headers.common.Authorization;
  }
};

export default instanceAxios;
