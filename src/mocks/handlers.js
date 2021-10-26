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
      accessToken: 'Bear f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
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
      accessToken: 'Bear f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.post('/api/auth/logout', (req, res, ctx) => res(ctx.status(204))),
  rest.get('/api/search/location', (req, res, ctx) => res(ctx.status(200), ctx.json({
    title: 'test',
  }))),

  rest.get('/api/apartments/popular/images', (req, res, ctx) => setTimeout(() => res(ctx.status(200), ctx.json(mockDataForPopularRooms)), 1500)),

  rest.get('/api/apartments/:id', (req, res, ctx) => setTimeout(() => res(ctx.status(200), ctx.json(mockDataForPreviewPage)), 1500)),
];
