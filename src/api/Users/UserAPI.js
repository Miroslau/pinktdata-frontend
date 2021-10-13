import axios from 'axios';

export default {
  signIn(user) {
    return axios.post('http://localhost:3000/api/users/login', user);
  },

  signUp(user) {
    return axios.post('http://localhost:3000/api/users', user);
  },

  logOut() {
    return axios.post('http://localhost:3000/api/users/Logout');
  },
};
