// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3000/api/auth/registration', (req, res, ctx) => {
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
  rest.post('http://localhost:3000/api/auth/login', (req, res, ctx) => {
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
  rest.post('http://localhost:3000/api/auth/logout', (req, res, ctx) => res(ctx.status(204))),
  rest.get('/api/search/location', (req, res, ctx) => res(ctx.status(200), ctx.json({
    title: 'test',
  }))),
  rest.get('http://localhost/api/apartments/locations', (req, res, ctx) => {
    const params = req.url.searchParams.get('query');
    const cities = ['minsk', 'gomel', 'grodno', 'brest', 'vitebsk', 'mogileu', 'moscow', 'snp', 'miami', 'vitebsk'];
    return res(ctx.json({
      cities: cities.filter((x) => x.includes(params)),
    }));
  }),
];
