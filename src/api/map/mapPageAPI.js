const axios = require('axios');

export default {
  // getAllData() {
  //   return axios.get('/api/apartments/getAll');
  // },
  searchApartments(location, page) {
    return axios.get('/api/apartments/search', { params: { location, page } });
  },
  renderOnTheMap() {
    return axios.get('/api/apartments/renderOnTheMap');
  },
  // getAllDataRoom() {
  //   return axios.get('/api/apartments/getAllRoom');
  // },
};
