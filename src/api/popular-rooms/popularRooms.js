import axios from 'axios';

export default {
  async popularRooms() {
    const response = await axios.get('/apartments/popular/images');
    const { data } = response;
    return data;
  },
};
