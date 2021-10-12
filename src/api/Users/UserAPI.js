const axios = require('axios');

export default {
  signIn(user) {
    return axios.post('/api/user/login', user);
  },

  signUp(user) {
    return axios.post('/api/user/register', user);
  },
};
