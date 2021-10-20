import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MajorCity from './MajorCity';
import { server } from '../../../mocks/server';

// eslint-disable-next-line no-undef
describe('MajorCity Component', () => {
  process.env.REACT_APP_IS_MOCKING = true;

  // eslint-disable-next-line no-undef
  beforeAll(() => server.listen({
    onUnhandledRequest: 'error',
  }));
  // eslint-disable-next-line no-undef
  afterEach(() => server.restoreHandlers());
  // eslint-disable-next-line no-undef
  afterAll(() => server.close());

  // eslint-disable-next-line no-undef
  it('renders component Major cities', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<MajorCity />);
  });

  // eslint-disable-next-line no-undef
  it('fetches major cities from an API', async () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    const { findByText } = render(<MajorCity />);
    // eslint-disable-next-line no-undef
    expect(await findByText('Los Angeles')).toBeInTheDocument();
  });
});
