import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import httpClient from '../index';
import RoomPage from '../../pages/room-page/RoomPage';

jest.mock('../index.js');

describe('getRoomById function', () => {
  test('should return text when data not passed', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: null }));

    render((
      <BrowserRouter>
        <RoomPage />
      </BrowserRouter>
    ));

    screen.debug();
    expect(await screen.findByText(/Data loading.../i)).toBeTruthy();
  });
});
