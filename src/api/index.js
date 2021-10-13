import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost/api/',
  withCredentials: true,
});

instanceAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export { instanceAxios };
