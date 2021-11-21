import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';
import Tabs from './Tabs';
import ApartmentFilters from './apartment-filters/ApartmentFilters';

describe('Tabs Component', () => {
  let isActiveModal = false;
  const apartmentFilter = () => {};
  const setModalActive = () => {
    const mockSetModalActive = jest.fn().mockImplementation((value) => value);
    isActiveModal = mockSetModalActive(!isActiveModal);
  };

  it('renders component tabs', () => {
    const { container } = render(<Tabs apartmentFilter={apartmentFilter} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render button Available', () => {
    render(<Tabs apartmentFilter={apartmentFilter} />);
    const button = screen.getByText('Available');
    expect(button).toBeInTheDocument();
  });

  it('should render button 3 Star', () => {
    render(<Tabs apartmentFilter={apartmentFilter} />);
    const button = screen.getByText('3 Star');
    expect(button).toBeInTheDocument();
  });

  it('open modal on click button Filters', async () => {
    const { rerender } = render(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);
    const button = screen.getByText('Filters');

    userEvent.click(button);

    rerender(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);

    const result = await screen.getByText('Price range');

    expect(result).toBeInTheDocument();
  });

  it('close modal on click button close', async () => {
    const { rerender, container } = render(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);

    const button = screen.getByText('Filters');

    userEvent.click(button);

    rerender(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);

    const closeButton = await container.querySelectorAll('.MuiButtonBase-root')[0];

    userEvent.click(closeButton);

    rerender(<Tabs
      apartmentFilter={apartmentFilter}
      isActiveModal={isActiveModal}
      setModalActive={setModalActive}
    />);

    const resultText = await screen.getByText('Price');

    expect(resultText).toBeInTheDocument();
  });

  it('should has apartment filter in tabs component', () => {
    const { container } = render(<ApartmentFilters apartmentFilter={apartmentFilter} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
