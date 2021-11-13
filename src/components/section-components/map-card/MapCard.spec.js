import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import httpClient from '../../../api/index';
import mockDataForPreviewPage from '../../../mocks/mocks-constants/mockDataForPreviewPage';
import MapCard from './MapCard';

jest.mock('../../../api/index.js');

describe('MapCard component', () => {
  const history = createMemoryHistory();

  test('should have the loading skeleton when data loading', () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));
    render(
      <Router location={history.location} navigator={history}>
        <MapCard id={mockDataForPreviewPage.id} />
      </Router>,
    );
    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  test('should have the text name', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));
    render(
      <Router location={history.location} navigator={history}>
        <MapCard id={mockDataForPreviewPage.id} />
      </Router>,
    );

    const name = await screen.findByText(mockDataForPreviewPage.name);
    expect(name).toBeInTheDocument();
  });

  test('redirect to preview page on click image on card', async () => {
    httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: mockDataForPreviewPage }));

    render(
      <Router location={history.location} navigator={history}>
        <MapCard id={mockDataForPreviewPage.id} />
      </Router>,
    );

    const image = await screen.findAllByTestId('map-card-slider');
    userEvent.click(image[0]);
    expect(history.location.pathname).toBe(`/apartments/${mockDataForPreviewPage.id}`);
  });
});
