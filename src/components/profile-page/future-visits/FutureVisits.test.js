import '@testing-library/jest-dom';
import {
  getByTestId, render, screen,
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
    endDate: '2021-12-01T12:00:00.000Z',
    startDate: '2021-11-30T12:00:00.000Z',
    room: {
      id: '6017d853055800005800a3de',
      name: 'Name title',
      address: 'Text address',
      city: 'New York',
      bedroomCount: 2,
      images: [
        {
          id: '765462109',
          picture: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg?im_w=720',
        },
      ],
    },
  };

  const history = createMemoryHistory();

  it('renders component future-visits', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have the loading skeleton when data loading', () => {
    const text = getByTestId(container, 'Skeleton');
    expect(text).toBeTruthy();
  });

  it(' render title component RoomFutureItems', () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems visit={itemRoom} />
      </Router>,
    );

    const title = screen.getByText(/Name title/i);
    expect(title).toBeInTheDocument();
  });

  it(' render data component RoomFutureItems', () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems visit={itemRoom} />
      </Router>,
    );

    const data = screen.getByText(/30.11.2021/i);
    expect(data).toBeInTheDocument();
  });

  it(' render img component RoomFutureItems', () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems visit={itemRoom} />
      </Router>,
    );

    const img = screen.getByAltText(/Name title/i);
    expect(img).toBeInTheDocument();
  });

  it('redirect to preview page on click title on card', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <RoomFutureItems visit={itemRoom} />
      </Router>,
    );

    const image = await screen.findAllByTestId('future-visits-click');
    userEvent.click(image[0]);
    expect(history.location.pathname).toBe(`/apartments/${itemRoom.room.id}`);
  });
});
