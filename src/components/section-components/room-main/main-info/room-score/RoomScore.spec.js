import { render, screen } from '@testing-library/react';
import React from 'react';
import { roomContext } from '../../../../../store/context/roomContext';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';
import RoomScore from './RoomScore';

describe('RoomScore component', () => {
  test('should have render score text', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomScore />
      </roomContext.Provider>
    ));
    const scoreText = screen.getByText(/4.99/i);
    const reviewsText = screen.getByText(/\(1010\)/i);
    expect(scoreText).toBeTruthy();
    expect(reviewsText).toBeTruthy();
  });
});
