const axios = require('axios');

export default {
  getAllData() {
    return axios.get('/api/apartments/getAll');
  },
  renderOnTheMap() {
    return axios.get('/api/apartments/renderOnTheMap');
  },
};
