import httpClient from '../index';

export const paymentIntentAPI = (data) => httpClient.post('/payment/intent', data);
export const paymentRetrieveAPI = (data) => httpClient.post('/payment/retrieve', data);
