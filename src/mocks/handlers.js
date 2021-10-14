// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:3000/api/users', (req, res, ctx) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName,
      lastName,
      email,
      password,
      successToken: 'Bear f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.post('http://localhost:3000/api/users/login', (req, res, ctx) => {
    const {
      email, password,
    } = req.body;

    if (email !== 'mira2408@mail.ru' || password !== 'Mira$1234') {
      return res(ctx.status(403), ctx.json({
        errorMessage: 'Invalid email or password',
      }));
    }

    return res(ctx.status(200), ctx.json({
      id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
      firstName: 'Miraslau',
      lastName: 'Rabikau',
      email,
      password,
      successToken: 'Bear f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
    }));
  }),
  rest.post('http://localhost:3000/api/users/Logout', (req, res, ctx) => res(ctx.status(200), ctx.text('User Logout'))),
];
