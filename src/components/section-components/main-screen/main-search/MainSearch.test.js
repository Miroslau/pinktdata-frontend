import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MainSearch from './MainSearch';

describe('Render component MainSearch', () => {
  test('renders component bedroom count', () => {
    render(<MainSearch />);
    expect(screen.getByText('Bedroom count')).toBeInTheDocument();
  });

  test('has open popup when click on label', async () => {
    render(<MainSearch />);
    const button = screen.getByText(/bedroom count/i);
    fireEvent.click(button);
    const popupText = await screen.findByText('Select the number of rooms');
    expect(popupText).toBeInTheDocument();
  });

  test('has change count bedrooms when click button plus', async () => {
    render(<MainSearch />);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonAdd = await screen.getByRole('button', { name: /add/i });
    fireEvent.click(buttonAdd);
    const textLabelAdd = await screen.findByText(/Bedroom count: 1/i);
    expect(textLabelAdd).toBeInTheDocument();
  });

  test('has change count bedrooms when click button minus', async () => {
    render(<MainSearch />);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonAdd = await screen.getByRole('button', { name: /add/i });
    const countClick = [...Array(2)];
    countClick.forEach(() => fireEvent.click(buttonAdd));
    const buttonRemove = await screen.getByRole('button', { name: /remove/i });
    fireEvent.click(buttonRemove);
    const textLabelAdd = await screen.findByText(/Bedroom count: 1/i);
    expect(textLabelAdd).toBeInTheDocument();
  });

  test('has not change count bedrooms when click the button plus if bedrooms more 5', async () => {
    render(<MainSearch />);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonAdd = await screen.getByRole('button', { name: /add/i });
    const countClick = [...Array(9)];
    countClick.forEach(() => fireEvent.click(buttonAdd));
    const textLabelAdd = await screen.findByText(/Bedroom count: 5/i);
    expect(textLabelAdd).toBeInTheDocument();
  });

  test('has not change count bedrooms when click the button minus if bedrooms 0', async () => {
    render(<MainSearch />);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonRemove = await screen.getByRole('button', { name: /remove/i });
    const countClick = [...Array(9)];
    countClick.forEach(() => fireEvent.click(buttonRemove));
    const textLabelAdd = await screen.findByText(/0/i);
    expect(textLabelAdd).toBeInTheDocument();
  });
});
