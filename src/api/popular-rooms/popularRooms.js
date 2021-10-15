const axios = require('axios');

export default {
  async popularRooms() {
    console.log('get popular rooms');
    const response = await axios.get('/api/search/rooms');
    const { data } = response;
    console.log(data.images);
    return data.images;
  },
};
