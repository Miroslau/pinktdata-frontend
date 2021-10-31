import '@testing-library/jest-dom';
import {
  fireEvent, render, screen, findByText,
} from '@testing-library/react';
import ApartmentFilters from './ApartmentFilters';

describe('Apartment filter component', () => {
  const apartmentFilter = () => {};

  let container;
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

  it('has open input when click on right label', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(textLabel);
    const result = await screen.getByText('1000');
    expect(result).toBeInTheDocument();
  });

  it('has open input when click on left label', async () => {
    const textLabel = await screen.findByText('Min price: 10');
    fireEvent.click(textLabel);
    const result = await screen.getByText('10');
    expect(result).toBeInTheDocument();
  });

  it('has close inputs when change slider', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(textLabel);
    const slide = await container.querySelectorAll('input')[1];
    fireEvent.change(slide, { target: { value: '500' } });
    fireEvent.blur(slide);
    const result = await findByText(container, '500');
    expect(result).toBeInTheDocument();
  });

  it('has close right input when click on left label', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(textLabel);
    const rightInput = await container.querySelectorAll('input')[0];
    fireEvent.change(rightInput, { target: { value: '500' } });
    fireEvent.blur(rightInput);
    const leftLabel = await screen.findByText('Min price: 10');
    fireEvent.click(leftLabel);
    const result = await findByText(container, '500');
    expect(result).toBeInTheDocument();
  });

  it('has close left input when click on right label', async () => {
    const textLabel = await screen.findByText('Min price: 10');
    fireEvent.click(textLabel);
    const rightInput = await container.querySelectorAll('input')[0];
    fireEvent.change(rightInput, { target: { value: '500' } });
    fireEvent.blur(rightInput);
    const leftLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(leftLabel);
    const result = await findByText(container, '500');
    expect(result).toBeInTheDocument();
  });

  it('has change count bedrooms when click button plus', async () => {
    const buttonPlus = await container.querySelectorAll('.MuiButton-root')[1];
    fireEvent.click(buttonPlus);
    const result = await findByText(container, '1');
    expect(result).toBeInTheDocument();
  });

  it('has change count bedrooms when click button minus', async () => {
    const buttonPlus = await container.querySelectorAll('.MuiButton-root')[1];
    fireEvent.click(buttonPlus);
    fireEvent.click(buttonPlus);
    const buttonMinus = await container.querySelectorAll('.MuiButton-root')[0];
    fireEvent.click(buttonMinus);
    const result = await findByText(container, '1');
    expect(result).toBeInTheDocument();
  });

  it('has not change count bedrooms when click disabled button minus', async () => {
    const buttonMinus = await container.querySelectorAll('.MuiButton-root')[0];
    fireEvent.click(buttonMinus);
    const result = await findByText(container, '0');
    expect(result).toBeInTheDocument();
  });

  it('has not change count bedrooms when click disabled button plus', async () => {
    const buttonPlus = await container.querySelectorAll('.MuiButton-root')[1];
    const countClick = [...Array(7)];
    countClick.forEach(() => fireEvent.click(buttonPlus));
    const result = await findByText(container, '5');
    expect(result).toBeInTheDocument();
  });

  it('has clear settings price range when click button clear', async () => {
    const slideRight = await container.querySelectorAll('input')[1];
    fireEvent.change(slideRight, { target: { value: '500' } });
    fireEvent.blur(slideRight);
    const slideLeft = await container.querySelectorAll('input')[0];
    fireEvent.change(slideLeft, { target: { value: '100' } });
    fireEvent.blur(slideLeft);
    const clearButton = await findByText(container, 'Clear');
    fireEvent.click(clearButton);
    const result = await findByText(container, 'Max price: 1000+');
    expect(result).toBeInTheDocument();
  });

  it('has clear settings count bedrooms when click button clear', async () => {
    const buttonPlus = await container.querySelectorAll('.MuiButton-root')[1];
    fireEvent.click(buttonPlus);
    const clearButton = await findByText(container, 'Clear');
    fireEvent.click(clearButton);
    const result = await findByText(container, '0');
    expect(result).toBeInTheDocument();
  });
});
