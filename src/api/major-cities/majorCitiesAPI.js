import httpClient from '../index';

export default {
  getMajorCities() {
    return httpClient.get('/cities');
  },
};
