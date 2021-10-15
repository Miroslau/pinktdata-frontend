import axios from 'axios';
import { useSelector } from 'react-redux';
import { CURRENT_URL } from '../constants/domains';
import { userSelector } from '../store/slice/userSlice';

const instanceAxios = axios.create({
  baseURL: CURRENT_URL,
  withCredentials: true,
});

const { token } = useSelector(userSelector);

instanceAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `${token}`;
  return config;
});

export { instanceAxios };
