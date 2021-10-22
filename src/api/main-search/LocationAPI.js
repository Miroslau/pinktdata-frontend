import httpClient from '../index';

export default {
  async search(location) {
    const res = await httpClient.get(`http://localhost/api/apartments/locations?query=${location}`);
    const { data } = res;
    return data;
  },
};
