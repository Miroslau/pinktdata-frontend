// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import mockDataForPreviewPage from './mocks-constants/mockDataForPreviewPage';
import mockDataForPopularRooms from './mocks-constants/mockDataForPopularRooms';

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
  rest.get('/api/apartments/locations/most-apartments', (req, res, ctx) => res(ctx.json([
    {
      city: 'Los Angeles',
      publicAddress: 'Los Angeles',
      imageUrl: 'https://i.pinimg.com/564x/06/77/a7/0677a7a87420d91536f200d921694fb8.jpg',
      count: 2229,
    },
    {
      city: 'Miami',
      publicAddress: 'Miami',
      imageUrl: 'https://i.pinimg.com/564x/88/bb/cb/88bbcbf3579b880d81f7dcc969c89e44.jpg',
      count: 1589,
    },
    {
      city: 'San Francisco',
      publicAddress: 'San Francisco',
      imageUrl: 'https://i.pinimg.com/564x/23/84/66/238466913b4fdeb5eec4cd44b57307f2.jpg',
      count: 1303,
    },
    {
      city: 'Houston',
      publicAddress: 'Houston',
      imageUrl: 'https://i.pinimg.com/564x/14/7e/1d/147e1df9f7619e9e5d14398aaa7030ee.jpg',
      count: 1254,
    },
    {
      city: 'New York',
      publicAddress: 'New York',
      imageUrl: 'https://i.pinimg.com/564x/cc/30/74/cc30746029f69d8de4f88153e243888d.jpg',
      count: 1184,
    },
  ]))),
  rest.get('/api/apartments/search', (req, res, ctx) => {
    const location = req.url.searchParams.get('location');
    const apartments = [
      {
        id: 1,
        location: 'Los Angeles',
        name: 'BBBoy',
      },
      {
        id: 2,
        location: 'Los Angeles',
        name: 'SSSb',
      },
      {
        id: 3,
        location: 'San Francisco',
        name: 'Nuck',
      },
    ];
    return res(ctx.json(apartments.filter((item) => item.location === location)));
  }),

  rest.get('/api/apartments/popular/images', (req, res, ctx) => setTimeout(() => res(ctx.status(200), ctx.json(mockDataForPopularRooms)), 1500)),

  rest.get('/api/apartments/:id', (req, res, ctx) => setTimeout(() => res(ctx.status(200), ctx.json(mockDataForPreviewPage)), 1500)),
];
