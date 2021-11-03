import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import httpClient from '../../../api/index';
import mockDataForPreviewPage from '../../../mocks/mocks-constants/mockDataForPreviewPage';
import MapCard from './MapCard';

jest.mock('../../../api/index.js');

describe('MapCard component', () => {
  test('should have the loading skeleton when data loading', () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));
    render(
      <BrowserRouter>
        <MapCard id={mockDataForPreviewPage.id} />
      </BrowserRouter>,
    );
    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  test('should have the text name', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));
    render(
      <BrowserRouter>
        <MapCard id={mockDataForPreviewPage.id} />
      </BrowserRouter>,
    );

    const name = await screen.findByText(mockDataForPreviewPage.name);
    expect(name).toBeInTheDocument();
  });

  test('redirect to preview page on click image on card', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));
    const history = createMemoryHistory();

    render(
      <BrowserRouter>
        <Router history={history}>
          <MapCard id={mockDataForPreviewPage.id} />
        </Router>
      </BrowserRouter>,
    );

    const image = await screen.findAllByTestId('map-card-slider');
    userEvent.click(image[0]);
    expect(history.location.pathname).toBe(`/apartments/${mockDataForPreviewPage.id}`);
  });
});
