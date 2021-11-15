import { render, screen } from '@testing-library/react';
import React from 'react';
import { roomContext } from '../../../../../store/context/roomContext';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';
import RoomStars from './RoomStars';

describe('RoomStars component', () => {
  test('should have render stars text', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomStars />
      </roomContext.Provider>
    ));
    const starsText = screen.getByText(/excellent+/i);
    expect(starsText).toBeTruthy();
  });
});
