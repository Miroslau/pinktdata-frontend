import httpClient from '../index';

export default {
  searchApartments({ location, page = 1, limit = 999 }) {
    return httpClient.get('/apartments/search', { params: { location, page, limit } });
  },
};
