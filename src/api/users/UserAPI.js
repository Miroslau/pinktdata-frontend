import httpClient from '../index';

export default {
  signIn(user) {
    return httpClient.post('/auth/login', user);
  },

  signUp(user) {
    return httpClient.post('/auth/registration', user);
  },

  logOut() {
    return httpClient.get('/auth/logout');
  },
};
