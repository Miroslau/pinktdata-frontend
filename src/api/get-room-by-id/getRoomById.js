import httpClient from '../index';

export default {
  getRoomById(id) {
    return httpClient.get(`/apartments/${id}`);
  },
};
