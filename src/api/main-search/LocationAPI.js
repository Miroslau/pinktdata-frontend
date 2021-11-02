import httpClient from '../index';

export default {
  async search(location) {
    const res = await httpClient.get(`/apartments/locations?query=${location}`);
    const { data } = res;
    return data;
  },
};
