import httpClient from '../index';

export default {
  searchApartments(
    location = '',
    page = 1,
    priceFrom = 0,
    priceTo,
    bedrooms,
    isMax,
    bounds,
  ) {
    const params = { location, page, priceFrom };
    if (isMax) params.priceTo = priceTo;
    if (bounds) {
      params.neLat = bounds.getNorth();
      params.neLng = bounds.getEast();
      params.swLat = bounds.getSouth();
      params.swLng = bounds.getWest();
    }
    if (bedrooms !== 0) params.bedrooms = bedrooms;
    return httpClient.get('/apartments/search', {
      params,
    });
  },
};
