import httpClient from '../index';

export default {
  addRoom(room) {
    return httpClient.post('/apartments', room);
  },

  getRoomsForRent() {
    return httpClient.get('/apartments/user-apartments');
  },

  getVisitHistory() {
    return httpClient.get('/trips/history');
  },

  futureRooms() {
    return httpClient.get('/trips/future');
  },
};
