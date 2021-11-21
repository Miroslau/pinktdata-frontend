import httpClient from '../index';

export default {
  paymentIntent(data) {
    return httpClient.post('/payment/intent', data);
  },
};
