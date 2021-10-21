// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

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
  rest.post('/api/auth/logout', (req, res, ctx) => res(ctx.status(204))),
  rest.get('/api/apartments/locations/most-apartments', (req, res, ctx) => res(ctx.json(mockDataMajorCities))),
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
    } else if (priceFrom) {
      aparts = aparts.filter((item) => item.priceValue >= priceFrom);
    }
    if (bedrooms) {
      aparts = aparts.filter((item) => item.bedrooms === +bedrooms);
    }
    return res(ctx.delay(), ctx.status(200), ctx.json(aparts));
  }),

  rest.get('/api/apartments/popular/images', (req, res, ctx) => res(ctx.delay(1500), ctx.status(200), ctx.json(mockDataForPopularRooms))),

  rest.get('/api/apartments/:id', (req, res, ctx) => res(ctx.delay(1500), ctx.status(200), ctx.json(mockDataForPreviewPage))),
];
