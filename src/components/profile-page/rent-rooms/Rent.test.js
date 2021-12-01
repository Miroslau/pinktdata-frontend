import '@testing-library/jest-dom';
import {
  act, findByText, getByTestId, render, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Rent from './Rent';

describe('rent-rooms Component', () => {
  let unmount;
  // eslint-disable-next-line no-unused-vars
  let container;
  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(
      <BrowserRouter>
        <Rent />
      </BrowserRouter>,
    );
    container = currentContainer;
    unmount = currentUnmount;
  });
  afterEach(() => {
    unmount();
  });

  it('renders component rent-rooms', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the loading skeleton when data loading', () => {
    const text = getByTestId(container, 'Skeleton');
    expect(text).toBeTruthy();
  });

  it('fetches rooms for rents an API', async () => {
    act(() => jest.advanceTimersByTime(1500));

    await waitFor(() => {
      const text = findByText(container, 'Free Parking guaranteed');
      expect(text).toBeTruthy();
    });
  });
});
