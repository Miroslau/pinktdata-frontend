// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import mockDataForPopularRooms from './mocks-constants/mockDataForPopularRooms';
import mockDataMajorCities from './mocks-constants/mockDataMajorCities';
import mockDataApartments from './mocks-constants/mockDataApartments';

export const handlers = [
  rest.post('/api/auth/registration', (req, res, ctx) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName,
      lastName,
      email,
      password,
      accessToken: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.post('/api/auth/login', (req, res, ctx) => {
    const {
      email, password,
    } = req.body;

    if (email !== 'mira2408@mail.ru' || password !== 'Mira$1234') {
      return res(ctx.status(403), ctx.json({
        message: 'Invalid email or password',
      }));
    }

    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName: 'Miraslau',
      lastName: 'Rabikau',
      email,
      password,
      accessToken: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.get('/api/apartments/popular/images', (req, res, ctx) => res(ctx.status(200), ctx.json(mockDataForPopularRooms))),
  rest.get('/api/apartments/locations/most-apartments', (req, res, ctx) => res(ctx.delay(), ctx.status(200), ctx.json(mockDataMajorCities))),
  rest.get('/api/apartments/search', (req, res, ctx) => {
    const location = req.url.searchParams.get('location');
    const priceFrom = req.url.searchParams.get('priceFrom');
    const priceTo = req.url.searchParams.get('priceTo');
    const bedrooms = req.url.searchParams.get('bedrooms');
    let aparts = [...mockDataApartments];
    if (location) {
      aparts = aparts.filter((item) => item.address === location);
    }
    if (priceFrom && priceTo) {
      aparts = aparts.filter((item) => item.priceValue >= priceFrom && item.priceValue <= priceTo);
    }
    if (bedrooms) {
      aparts = aparts.filter((item) => item.bedrooms === +bedrooms);
    }
    return res(ctx.delay(), ctx.status(200), ctx.json(aparts));
  }),
  rest.get('/api/auth/logout', (req, res, ctx) => res(ctx.status(204))),
  rest.get('/api/search/location', (req, res, ctx) => res(ctx.status(200), ctx.json({
    title: 'test',
  }))),
  rest.get('/api/search/rooms', (req, res, ctx) => {
    const images = [
      {
        image: 'https://cdn.shopify.com/s/files/1/1765/3959/collections/Screen_Shot_2021-06-30_at_9.24.07_AM_0af7c44d-82f5-4497-a242-67ef3c78e9e6_700x.png?v=1627574426',
        id: 12312,
      },
      {
        image: 'https://media.architecturaldigest.com/photos/584ada2946458b735ce19242/master/w_2957,h_1882,c_limit/wallpaper-rooms-01.jpg',
        id: 12312,
      },
      {
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg',
        id: 12312,
      },
      {
        image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-tour-natasha-bardaran-9-1607305891.jpg?crop=1.00xw:0.713xh;0,0.238xh&resize=1200:*',
        id: 12312,
      },
    ];

    return res(ctx.status(200), ctx.json({
      images,
    }));
  }),
];
