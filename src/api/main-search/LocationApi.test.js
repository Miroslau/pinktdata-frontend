import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LocationAPI from './LocationAPI';
import MainSearch from '../../components/section-components/main-screen/main-search/MainSearch';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

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
    await waitFor(() => {
      expect(LocationAPI.search).toHaveBeenCalledTimes(1);
    });
  });
});
