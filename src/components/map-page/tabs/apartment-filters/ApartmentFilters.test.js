import '@testing-library/jest-dom';
import {
  fireEvent, render, screen, findByText,
} from '@testing-library/react';
import ApartmentFilters from './ApartmentFilters';

describe('Apartment filter component', () => {
  const apartmentFilter = () => {};

  // eslint-disable-next-line no-unused-vars
  let container;
  // eslint-disable-next-line no-unused-vars
  let unmount;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    const { container: currentContainer, unmount: currentUnmount } = render(<ApartmentFilters apartmentFilter={apartmentFilter} />);
    container = currentContainer;
    unmount = currentUnmount;
  });

  afterEach(() => {
    unmount();
  });

  it('renders component Apartment filter', () => {
    render(<ApartmentFilters apartmentFilter={apartmentFilter} />);
  });

  it('has open input when click on label', async () => {
    render(<ApartmentFilters apartmentFilter={apartmentFilter} />);
    const textLabel = await screen.findByText('Max price: 1000+');

    fireEvent.click(textLabel);

    const result = await screen.getByText('1000');

    expect(result).toBeInTheDocument();
  });

  it('has close input when change slider', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');

    fireEvent.click(textLabel);

    const slide = await container.querySelectorAll('input')[1];
    console.log(slide);
    // fireEvent.change(slide, { target: { value: '500' } });
    // const result = await findByText('500');
    // expect(result).toBeInTheDocument();
  });
});
