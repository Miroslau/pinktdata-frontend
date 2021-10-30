import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MainSearch from './MainSearch';

describe('Render component MainSearch', () => {
  test('Label placement', () => {
    render(<MainSearch />);
    expect(screen.getByText('Bedroom count')).toBeInTheDocument();
  });

  test('Button remove and button add', async () => {
    render(<MainSearch />);
    const button = screen.getByText(/bedroom count/i);
    fireEvent.click(button);
    await screen.findByText('Select the number of rooms');
    await screen.getByRole('button', { name: /remove/i });
    await screen.getByRole('button', { name: /add/i });
    screen.debug();
  });
});
