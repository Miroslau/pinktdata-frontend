import httpClient from '../index';

export default {
  review(review) {
    return httpClient.post('/apartments/review', review);
  },

};
