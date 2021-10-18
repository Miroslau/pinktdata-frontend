import { render, screen } from '@testing-library/react';
import TopRated from './TopRated';
import {BrowserRouter} from "react-router-dom";

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

  test('should have async render images', async () => {
    render((
      <BrowserRouter>
        <TopRated />
      </BrowserRouter>
    ));
    expect(await screen.findAllByAltText(/room/i)).toBeTruthy();
  });
});
