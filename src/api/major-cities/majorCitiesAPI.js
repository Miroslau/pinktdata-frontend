import httpClient from '../index';

export default {
  getMajorCities() {
    return httpClient.get('/apartments/locations/most-apartments');
  },
};
