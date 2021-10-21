import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainSearch from './MainSearch';

describe('MainSearch component', () => {
  test('looking for "Label placement"', () => {
    render(<MainSearch />);
    screen.debug();
    expect(screen.getByText('Label placement')).toBeInTheDocument();
  });
});
