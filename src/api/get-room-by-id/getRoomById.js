import httpClient from '../index';

export default {
  async getRoomById(id) {
    const response = await httpClient.get(`/apartments/getApartment/${id}`);
    const { data } = response;
    return data;
  },
};
