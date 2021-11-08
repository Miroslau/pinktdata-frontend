import { render, screen } from '@testing-library/react';
import React from 'react';
import { roomContext } from '../../../../../store/context/roomContext';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';
import RoomAmenities from './RoomAmenities';

describe('RoomAmenities component', () => {
  test('should have render text amenities', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomAmenities />
      </roomContext.Provider>
    ));
    const bathText = screen.getByText(/1 bathroom/i);
    const bedText = screen.getByText(/2 bed/i);
    expect(bathText).toBeTruthy();
    expect(bedText).toBeTruthy();
  });
});
