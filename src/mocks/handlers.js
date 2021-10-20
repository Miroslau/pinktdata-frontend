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
  rest.get('/api/apartments/locations/most-apartments', (req, res, ctx) => res(ctx.json([
    {
      id: 1,
      title: 'Los Angeles',
      img: 'https://i.pinimg.com/564x/06/77/a7/0677a7a87420d91536f200d921694fb8.jpg',
    },
    {
      id: 2,
      title: 'Miami',
      img: 'https://i.pinimg.com/564x/88/bb/cb/88bbcbf3579b880d81f7dcc969c89e44.jpg',
    },
    {
      id: 3,
      title: 'San Francisco',
      img: 'https://i.pinimg.com/564x/23/84/66/238466913b4fdeb5eec4cd44b57307f2.jpg',
    },
    {
      id: 4,
      title: 'Houston',
      img: 'https://i.pinimg.com/564x/14/7e/1d/147e1df9f7619e9e5d14398aaa7030ee.jpg',
    },
    {
      id: 5,
      title: 'New York',
      img: 'https://i.pinimg.com/564x/cc/30/74/cc30746029f69d8de4f88153e243888d.jpg',
    },
  ]))),
  rest.post('/api/auth/logout', (req, res, ctx) => res(ctx.status(204))),
  rest.get('/api/search/location', (req, res, ctx) => res(ctx.status(200), ctx.json({
    title: 'test',
  }))),
];
