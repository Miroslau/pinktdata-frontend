import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import apartments from '../../../mocks/mocks-constants/mockDataApartments';
import MapRender from './MapRender';

describe('Map render component', () => {
  const mockData = apartments;

  const component = render(
    <MapRender apart={mockData} />,
  );
  const { container } = component;
  const { unmount } = component;

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
