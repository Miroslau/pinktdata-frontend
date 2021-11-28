import httpClient from '../index';

export default {
  getRoomById(id, startDate, endDate) {
    const params = { startDate, endDate };
    return httpClient.get(`/apartments/${id}`, { params });
  },
};
