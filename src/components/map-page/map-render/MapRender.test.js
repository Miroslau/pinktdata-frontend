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

  it('should render Map', () => {
    expect(container.firstChild).toBeInTheDocument();
  });
});
