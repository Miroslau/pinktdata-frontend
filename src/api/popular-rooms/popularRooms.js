import httpClient from '../index';

export default {
  async popularRooms() {
    const response = await httpClient.get('/apartments/popular/images');
    const { data } = response;
    return data;
  },
};
