import httpClient from '../index';

export default {
  location() {
    const response = httpClient.get('/search/location');
    return response;
  },
};
