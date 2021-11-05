import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import apartments from '../../../mocks/mocks-constants/mockDataApartments';
import MapRender from './MapRender';

global.L = { control: jest.fn(), map: jest.fn() };
jest.mock('react-leaflet-markercluster', () => () => '');

describe('Map-Render component', () => {
  const mockData = apartments;
  const isFetching = true;

  const { container } = render(<MapRender apart={mockData} isFetching={isFetching} />);
  const { unmount } = render(<MapRender apart={mockData} isFetching={isFetching} />);

  afterEach(() => {
    unmount();
  });

  it('should render map component', () => {
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render map concrete location', () => {
    const location = [mockData[0].location.lat, mockData[0].location.lon];
    expect(location).toBeTruthy();
  });
});
