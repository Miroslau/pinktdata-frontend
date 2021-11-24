import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import { roomContext } from '../../store/context/roomContext';
import mockDataForPreviewPage from '../../mocks/mocks-constants/mockDataForPreviewPage';
import PaymentPage from './PaymentPage';

describe('PaymentPage component', () => {
  const history = createMemoryHistory();

  test('should have render title to enter card data', () => {
    render((
      <Router location={history.location} navigator={history}>
        <roomContext.Provider value={mockDataForPreviewPage}>
          <PaymentPage />
        </roomContext.Provider>
      </Router>
    ));

    expect(screen.getByText(/Enter your card details/i)).toBeTruthy();
  });
});
