const axios = require('axios');

export default {
  // getAllData() {
  //   return axios.get('/api/apartments/getAll');
  // },
  searchApartments(location, page, limit = 999) {
    return axios.get('/api/apartments/search', { params: { location, page, limit } });
  },
  renderOnTheMap() {
    return axios.get('/api/apartments/renderOnTheMap');
  },
  // getAllDataRoom() {
  //   return axios.get('/api/apartments/getAllRoom');
  // },
};
