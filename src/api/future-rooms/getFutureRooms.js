import httpClient from '../index';

export default {
  futureRooms() {
    return httpClient.get('/profile/future-rooms');
  },
};
