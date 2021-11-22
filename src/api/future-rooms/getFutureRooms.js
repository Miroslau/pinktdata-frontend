import httpClient from '../index';

export default {
  futureRooms() {
    return httpClient.get('/api/profile/future-rooms');
  },
};
