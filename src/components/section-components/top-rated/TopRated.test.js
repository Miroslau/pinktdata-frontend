import '@testing-library/jest-dom';
import { findByText, render } from '@testing-library/react';
import TopRated from './TopRated';

describe('TopRated component', () => {
  let unmount;
  // eslint-disable-next-line no-unused-vars
  let container;
  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(<TopRated />);
    container = currentContainer;
    unmount = currentUnmount;
  });
  afterEach(() => {
    unmount();
  });
  test('should have the text "Top Rated"', async () => {
    const text = await findByText(container, 'Top Rated');
    expect(text).toBeInTheDocument();
  });

  test('should have the text "Rooms loading" when images loading', async () => {
    const text = await findByText(container, 'Rooms loading...');
    expect(text).toBeInTheDocument();
  });
});
