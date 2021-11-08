import { render, screen } from '@testing-library/react';
import React from 'react';
import { roomContext } from '../../../../../store/context/roomContext';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';
import RoomPrice from './RoomPrice';

describe('RoomPrice component', () => {
  test('should have render price text', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomPrice />
      </roomContext.Provider>
    ));
    const priceText = screen.getByText(/\$42/i);
    expect(priceText).toBeTruthy();
  });
});
