import '@testing-library/jest-dom';
import {
  act, findByText, getByTestId, render, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import History from './History';

describe('visit-history Component', () => {
  let unmount;
  // eslint-disable-next-line no-unused-vars
  let container;
  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(
      <BrowserRouter>
        <History />
      </BrowserRouter>,
    );
    container = currentContainer;
    unmount = currentUnmount;
  });
  afterEach(() => {
    unmount();
  });

  it('renders component visit-history', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the loading skeleton when data loading', () => {
    const text = getByTestId(container, 'Skeleton');
    expect(text).toBeTruthy();
  });

  it('fetches visit-history rooms an API', async () => {
    act(() => jest.advanceTimersByTime(1500));

    await waitFor(() => {
      const text = findByText(container, 'Your Quiet Cozy Space in South Philly');
      expect(text).toBeTruthy();
    });
  });
});
