import httpClient from '../index';

export default {
  searchApartments(
    location,
    // eslint-disable-next-line default-param-last
    page = 1,
    // eslint-disable-next-line default-param-last
    priceFrom = 0,
    priceTo,
    bedrooms,
    isMax,
    bounds,
  ) {
    const params = { location, page, priceFrom };
    if (isMax) params.priceTo = priceTo;
    if (bounds) {
      params.neLat = bounds._northEast.lat;
      params.neLng = bounds._northEast.lng;
      params.swLat = bounds._southWest.lat;
      params.swLng = bounds._southWest.lng;
    }
    if (bedrooms !== 0) params.bedrooms = bedrooms;
    return httpClient.get('/apartments/search', {
      params,
    });
  },
};
