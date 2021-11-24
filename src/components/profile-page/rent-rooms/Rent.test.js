import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../../../mocks/server';
import Rent from './Rent';

describe('rent-rooms Component', () => {
  process.env.REACT_APP_IS_MOCKING = true;

  // eslint-disable-next-line no-undef
  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }));
  // eslint-disable-next-line no-undef
  afterEach(() => server.restoreHandlers());
  // eslint-disable-next-line no-undef
  afterAll(() => server.close());

  it('renders component rent-rooms', () => {
    const { container } = render(<BrowserRouter><Rent /></BrowserRouter>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('fetches rooms for rents an API', async () => {
    const { findByText } = render(<BrowserRouter><Rent /></BrowserRouter>);
    expect(await findByText('Free Parking guaranteed')).toBeInTheDocument();
  });
});
