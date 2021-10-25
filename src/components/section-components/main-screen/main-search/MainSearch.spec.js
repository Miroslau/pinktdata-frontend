import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainSearch from './MainSearch';

describe('Render component MainSearch', () => {
  test('Label placement', () => {
    render(<MainSearch />);
    expect(screen.getByText('Label placement')).toBeInTheDocument();
  });
});
