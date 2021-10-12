// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/user/register', (req, res, ctx) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName,
      lastName,
      email,
      password,
    }));
  }),
  rest.post('/api/user/login', (req, res, ctx) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    sessionStorage.setItem('is-authenticated', 'true');
    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName,
      lastName,
      email,
      password,
    }));
  }),
];
