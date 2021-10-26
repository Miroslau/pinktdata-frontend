import httpClient from '../index';

export default {
  bedroom() {
    return httpClient.get('/bedrooms');
  },
};
