import httpClient from '../index';

export default {
  searchApartments(location, page, limit = 999) {
    return httpClient.get('/api/apartments/search', { params: { location, page, limit } });
  },
  renderOnTheMap() {
    return httpClient.get('/api/apartments/renderOnTheMap');
  },
};
