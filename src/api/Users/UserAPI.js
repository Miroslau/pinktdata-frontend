import axios from 'axios';
import { CURRENT_URL } from '../../constants/domains';

export default {
  signIn(user) {
    return axios.post(`${CURRENT_URL}/auth/login`, user);
  },

  signUp(user) {
    return axios.post(`${CURRENT_URL}/auth/registration`, user);
  },

  logOut() {
    return axios.post(`${CURRENT_URL}/users/Logout`);
  },
};
