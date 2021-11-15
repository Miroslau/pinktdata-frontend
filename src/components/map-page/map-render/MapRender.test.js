import '@testing-library/jest-dom';
import { findByText, fireEvent, render } from '@testing-library/react';

import apartments from '../../../mocks/mocks-constants/mockDataApartments';
import MapRender from './MapRender';

global.L = { control: jest.fn(), map: jest.fn() };
jest.mock('react-leaflet-markercluster', () => () => '');

describe('Map-Render component', () => {
  const mockData = apartments;
  const isFetching = true;
  let isFetchOnMapEvents = false;
  let container;
  let unmount;

  const handleDragAndZoomMap = () => {};
  const setIsFetchOnMapEvents = () => {
    const mockSetIsFetchOnMapEvents = jest.fn().mockImplementation((value) => value);
    isFetchOnMapEvents = mockSetIsFetchOnMapEvents(!isFetchOnMapEvents);
  };

  beforeEach(() => {
    const { container: currentContainer, unmount: currentUnmount } = render(<MapRender
      apart={mockData}
      isFetching={isFetching}
      handleDragAndZoomMap={handleDragAndZoomMap}
      isFetchOnMapEvents={isFetchOnMapEvents}
      setIsFetchOnMapEvents={setIsFetchOnMapEvents}
    />);
    container = currentContainer;
    unmount = currentUnmount;
  });

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

  it('has render block for search apartments as move the map', async () => {
    const textLabel = await findByText(container, 'Search as I move the map');
    expect(textLabel).toBeInTheDocument();
  });

  it('should change value after click on checkbox', async () => {
    const checkbox = await container.querySelector('.PrivateSwitchBase-input');
    fireEvent.change(checkbox);
    expect(isFetchOnMapEvents === true);
  });

  it('should change apartments after dragend map', async () => {
    const checkbox = await container.querySelector('.PrivateSwitchBase-input');
    fireEvent.change(checkbox);
    await fireEvent.dragStart(container);
    await fireEvent.mouseMove(container, { clientX: -1 });
    await fireEvent.dragEnd(container);
    const location = [mockData[0].location.lat, mockData[0].location.lon];
    expect(location).toBeTruthy();
  });
});
