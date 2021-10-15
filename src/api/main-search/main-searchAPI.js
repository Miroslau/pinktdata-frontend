const axios = require('axios');

export default {
  location() {
    console.log('get location');
    return axios.get('/api/search/location');
  },
};
