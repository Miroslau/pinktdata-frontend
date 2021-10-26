import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import httpClient from '../index';
import TopRated from '../../components/section-components/top-rated/TopRated';
import mockDataForPopularRooms from '../../mocks/mocks-constants/mockDataForPopularRooms';

jest.mock('../index.js');

describe('Popular rooms function', () => {
  test('should have async render images', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPopularRooms }));

    render((
      <BrowserRouter>
        <TopRated />
      </BrowserRouter>
    ));

    expect(await screen.findAllByAltText(/room/i)).toBeTruthy();
  });
});
