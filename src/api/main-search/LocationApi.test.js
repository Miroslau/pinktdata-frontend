import '@testing-library/jest-dom';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LocationAPI from './LocationAPI';
import MainSearch from '../../components/section-components/main-screen/main-search/MainSearch';

jest.mock('../../utils/doWithUserDelay.js', () => ({
  doWithUserDelay: (callback) => callback(),
}));
jest.mock('./LocationAPI.js');

describe('LocationAPI function', () => {
  test('LocationAPI should have been called', async () => {
    render((
      <BrowserRouter>
        <MainSearch />
      </BrowserRouter>
    ));
    const inputSearch = screen.getByPlaceholderText('Location');
    expect(inputSearch).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'test' } });
    expect(LocationAPI.search).toHaveBeenCalledTimes(1);
  });
});
