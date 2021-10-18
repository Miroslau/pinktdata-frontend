const axios = require('axios');

export default {
  async popularRooms() {
    console.log('get popular rooms');
    const response = await axios.get('/api/apartments/popular/images');
    const { data } = response;
    return data;
  },
};
