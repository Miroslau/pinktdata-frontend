import httpClient from '../index';

export default {
  addRoom(user) {
    return httpClient.post('/auth/login/addRoom', user);
  },
};
