import httpClient from '../index';

export default {
  searchApartments(
    location = 'Philadelphia, PA, United State',
    page = 1,
    priceFrom,
    priceTo,
    bedrooms,
    isMax,
  ) {
    const params = { location, page, priceFrom };
    if (isMax) params.priceTo = priceTo;
    if (bedrooms !== 0) params.bedrooms = bedrooms;
    return httpClient.get('/apartments/search', {
      params,
    });
  },
};
