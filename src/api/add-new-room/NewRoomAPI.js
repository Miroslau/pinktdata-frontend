import httpClient from '../index';

export default {
  addRoom(room) {
    return httpClient.post('/profile/addRoom', room);
  },

  getRoomsForRent() {
    return httpClient.get('/profile/rooms');
  },
};
