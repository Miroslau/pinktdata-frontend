import httpClient from '../index';

export default { popularRooms() { return httpClient.get('/apartments/popular/images'); } };
