import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { server } from '../../../mocks/server';
import Card from './Card';

describe('Card Component', () => {
  process.env.REACT_APP_IS_MOCKING = true;

  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }));
  afterEach(() => server.restoreHandlers());
  afterAll(() => server.close());

  it('renders card component', () => {
    render(<Card />);
  });

  it('city has in card component', async () => {
    const { findByText } = render(<Card city="Philadelphia" />);
    expect(await findByText('Philadelphia')).toBeInTheDocument();
  });

  it('name has in card component', async () => {
    const { findByText } = render(<Card name="Free Parking guaranteed" />);
    expect(await findByText('Free Parking guaranteed')).toBeInTheDocument();
  });

  it('image has in card component', async () => {
    const { findByRole } = render(<Card img="https://a0.muscache.com/im/pictures/791e6c34-c71c-4090-92d4-c87a7a803162.jpg?im_w=720" />);
    const image = await findByRole('presentation');
    expect(image).toBeInTheDocument();
  });
});
