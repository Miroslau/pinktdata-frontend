import '@testing-library/jest-dom';
import {
  findByText, getByTestId, render,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopRated from './TopRated';

describe('TopRated component', () => {
  let unmount;
  // eslint-disable-next-line no-unused-vars
  let container;
  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(
      <BrowserRouter>
        <TopRated />
      </BrowserRouter>,
    );
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

  test('should have the loading skeleton when images loading', () => {
    const text = getByTestId(container, 'Skeleton');
    expect(text).toBeInTheDocument();
  });
});
