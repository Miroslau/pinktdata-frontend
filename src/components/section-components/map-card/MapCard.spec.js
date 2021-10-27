import '@testing-library/jest-dom';
import {
  findByText, getByTestId, render, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockDataForPreviewPage from '../../../mocks/mocks-constants/mockDataForPreviewPage';
import MapCard from './MapCard';

describe('MapCard component', () => {
  let unmount;
  let container;
  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(
      <BrowserRouter>
        <MapCard id={mockDataForPreviewPage.id} />
      </BrowserRouter>,
    );
    container = currentContainer;
    unmount = currentUnmount;
  });
  afterEach(() => {
    unmount();
  });

  test('should have the loading skeleton when data loading', () => {
    const skeleton = getByTestId(container, 'Skeleton');
    expect(skeleton).toBeTruthy();
  });

  test('should have the text name', async () => {
    await waitFor(() => {
      const name = findByText(container, mockDataForPreviewPage.name);
      expect(name).toBeTruthy();
    });
  });
});
