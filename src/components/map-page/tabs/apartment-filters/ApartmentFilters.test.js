import '@testing-library/jest-dom';
import {
  fireEvent, render, screen, findByText,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ApartmentFilters from './ApartmentFilters';
import Content from '../../content-render/Content';
import mockDataApartments from '../../../../mocks/mocks-constants/mockDataApartments';

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
    // eslint-disable-next-line no-shadow
    const { container } = render(<ApartmentFilters apartmentFilter={apartmentFilter} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has open input when click on min price label', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(textLabel);
    const result = await screen.getByText('1000');
    expect(result).toBeInTheDocument();
  });

  it('has open input when click on max price label', async () => {
    const textLabel = await screen.findByText('Min price: 10');
    fireEvent.click(textLabel);
    const result = await screen.getByText('10');
    expect(result).toBeInTheDocument();
  });

  it('has close inputs prices when change slider', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(textLabel);
    const slide = await container.querySelectorAll('input')[1];
    fireEvent.change(slide, { target: { value: '500' } });
    fireEvent.blur(slide);
    const result = await findByText(container, '500');
    expect(result).toBeInTheDocument();
  });

  it('has close max price input when click on min price label', async () => {
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

  it('has close min price input when click on max price label', async () => {
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
    const countClick = [...Array(9)];
    countClick.forEach(() => fireEvent.click(buttonPlus));
    const result = await findByText(container, '8');
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

  it('has clear settings price range min price input when click button clear', async () => {
    const textLabel = await screen.findByText('Min price: 10');
    fireEvent.click(textLabel);
    const rightInput = await container.querySelectorAll('input')[0];
    fireEvent.change(rightInput, { target: { value: '500' } });
    fireEvent.blur(rightInput);
    const clearButton = await findByText(container, 'Clear');
    fireEvent.click(clearButton);
    const result = await findByText(container, 'Min price: 10');
    expect(result).toBeInTheDocument();
  });

  it('has clear settings price range max price input when click button clear', async () => {
    const textLabel = await screen.findByText('Max price: 1000+');
    fireEvent.click(textLabel);
    const rightInput = await container.querySelectorAll('input')[0];
    fireEvent.change(rightInput, { target: { value: '500' } });
    fireEvent.blur(rightInput);
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

  it('has filter by params when click button apply', async () => {
    const history = createMemoryHistory();
    const slideRight = await container.querySelectorAll('input')[1];
    fireEvent.change(slideRight, { target: { value: '700' } });
    fireEvent.blur(slideRight);
    const slideLeft = await container.querySelectorAll('input')[0];
    fireEvent.change(slideLeft, { target: { value: '100' } });
    fireEvent.blur(slideLeft);
    const buttonPlus = await container.querySelectorAll('.MuiButton-root')[1];
    fireEvent.click(buttonPlus);
    const applyButton = await findByText(container, 'Apply');
    fireEvent.click(applyButton);
    const publicAddress = 'Philadelphia, PA, United States';
    const count = 2229;
    render(
      <Router location={history.location} navigator={history}>
        <Content
          publicAddress={publicAddress}
          count={count}
          apart={mockDataApartments}
          scrollHandler={null}
        />
      </Router>,
    );
    const result = await screen.getAllByText('Your Quiet Cozy Space in South Philly')[0];
    expect(result).toBeInTheDocument();
  });
});
