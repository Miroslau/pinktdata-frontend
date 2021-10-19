import httpClient from '../index';

export default {
  location() {
    return httpClient.get('/search/location');
  },
};
