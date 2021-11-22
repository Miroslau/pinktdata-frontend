import httpClient from '../index';

export default {
  addRoom(user) {
    return httpClient.post('/addRoom', user);
  },

  getRoomsForRent() {
    return httpClient.get('/profile/rooms');
  },
};
