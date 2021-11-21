import { render, screen } from '@testing-library/react';
import React from 'react';
import { roomContext } from '../../../../store/context/roomContext';
import mockDataForPreviewPage from '../../../../mocks/mocks-constants/mockDataForPreviewPage';
import RoomLocation from './RoomLocation';

describe('RoomLocation component', () => {
  test('should have render location text', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomLocation />
      </roomContext.Provider>
    ));
    const location = screen.getByText(/Belarus, Gomel, Some street/i);
    expect(location).toBeTruthy();
    screen.debug();
  });
});
