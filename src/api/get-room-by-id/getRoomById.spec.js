import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import httpClient from '../index';
import RoomPage from '../../pages/room-page/RoomPage';
import mockDataForPreviewPage from '../../mocks/mocks-constants/mockDataForPreviewPage';

jest.mock('../index.js');

describe('getRoomById function', () => {
  test('should return skeleton when data loading', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));

    render((
      <BrowserRouter>
        <RoomPage />
      </BrowserRouter>
    ));

    await waitFor(() => {
      const text = screen.getByTestId(/Skeleton/i);
      expect(text).toBeInTheDocument();
    });
  });
});
