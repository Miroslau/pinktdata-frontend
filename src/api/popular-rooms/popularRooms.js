import httpClient from '../index';

export default {
  popularRooms(startDate, endDate) {
    const params = { startDate, endDate };
    return httpClient.get('/apartments/popular/images', { params });
  },
};
