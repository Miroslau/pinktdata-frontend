import '@testing-library/jest-dom';
import {
  act, findByText, getByTestId, render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import FutureVisits from './FutureVisits';
import RoomFutureItems from './RoomFutureItems';

describe('future-visits Component', () => {
  let unmount;
  // eslint-disable-next-line no-unused-vars
  let container;
  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(
      <BrowserRouter>
        <FutureVisits />
      </BrowserRouter>,
    );
    container = currentContainer;
    unmount = currentUnmount;
  });
  afterEach(() => {
    unmount();
  });

  const itemRoom = {
    id: '6017d853055800005800a3de',
    name: 'Name title',
    address: 'Text address',
    city: 'New York',
    data: '18.11.21',
    bedroomCount: 2,
    images: [
      {
        id: '765462109',
        picture: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg?im_w=720',
      },
    ],
  };

  const history = createMemoryHistory();

  it('renders component future-visits', () => {
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

  it(' render title component RoomFutureItems', () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems room={itemRoom} />
      </Router>,
    );
    const title = screen.getByText(/Name title/i);

    expect(title).toBeInTheDocument();
  });

  it(' render data component RoomFutureItems', () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems room={itemRoom} />
      </Router>,
    );
    const data = screen.getByText(/18.11.21/i);

    expect(data).toBeInTheDocument();
  });

  it(' render img component RoomFutureItems', () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems room={itemRoom} />
      </Router>,
    );
    const img = screen.getByAltText(/Name title/i);

    expect(img).toBeInTheDocument();
  });

  it('redirect to preview page on click title on card', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems room={itemRoom} />
      </Router>,
    );

    const image = await screen.findAllByTestId('future-visits-click');
    userEvent.click(image[0]);
    screen.debug();
    expect(history.location.pathname).toBe('/apartments/6017d853055800005800a3de');
  });
});
