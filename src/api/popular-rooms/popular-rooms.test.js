import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import httpClient from '../index';
import TopRated from '../../components/section-components/top-rated/TopRated';

jest.mock('../index.js');

const images = [
  {
    image: 'https://cdn.shopify.com/s/files/1/1765/3959/collections/Screen_Shot_2021-06-30_at_9.24.07_AM_0af7c44d-82f5-4497-a242-67ef3c78e9e6_700x.png?v=1627574426',
    id: 12312,
  },
  {
    image: 'https://media.architecturaldigest.com/photos/584ada2946458b735ce19242/master/w_2957,h_1882,c_limit/wallpaper-rooms-01.jpg',
    id: 12312,
  },
  {
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg',
    id: 12312,
  },
  {
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-tour-natasha-bardaran-9-1607305891.jpg?crop=1.00xw:0.713xh;0,0.238xh&resize=1200:*',
    id: 12312,
  },
];

describe('Popular rooms function', () => {
  test('should have async render images', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: images }));

    render((
      <BrowserRouter>
        <TopRated />
      </BrowserRouter>
    ));

    expect(await screen.findAllByAltText(/room/i)).toBeTruthy();
  });
});
