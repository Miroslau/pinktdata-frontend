import { render, screen } from '@testing-library/react';
import React from 'react';
import { roomContext } from '../../../../../store/context/roomContext';
import RoomPreview from './RoomPreview';
import mockDataForPreviewPage from '../../../../../mocks/mocks-constants/mockDataForPreviewPage';

describe('RoomPreview component', () => {
  test('should have render images', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomPreview />
      </roomContext.Provider>
    ));

    expect(screen.getAllByAltText(/slider/i)).toBeTruthy();
  });

  test('should have render main image', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomPreview />
      </roomContext.Provider>
    ));

    expect(screen.getByAltText(/room-preview/i)).toBeTruthy();
  });

  test('should have render room info paragraph', () => {
    render((
      <roomContext.Provider value={mockDataForPreviewPage}>
        <RoomPreview />
      </roomContext.Provider>
    ));

    expect(screen.getByText(/Room info/i)).toBeTruthy();
  });
});
