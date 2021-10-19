import { render, screen } from '@testing-library/react';
import TopRated from './TopRated';

describe('TopRated component', () => {
  test('should have the text "Top Rated"', () => {
    render(<TopRated />);
    const elementWithText = screen.getByText(/Top Rated/i);
    expect(elementWithText).toBeInTheDocument();
  });

  test('should have the text "Rooms loading" when images loading', () => {
    render(<TopRated />);
    const elementWithText = screen.getByText(/Rooms loading/i);
    expect(elementWithText).toBeInTheDocument();
  });
});
