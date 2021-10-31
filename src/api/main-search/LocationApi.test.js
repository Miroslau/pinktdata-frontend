import '@testing-library/jest-dom';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import _ from 'lodash';
import LocationAPI from './LocationAPI';
import MainSearch from '../../components/section-components/main-screen/main-search/MainSearch';

jest.mock('./LocationAPI.js');

describe('LocationAPI function', () => {
  test('should have async render cities', async () => {
    const debouncedFunc = _.debounce(LocationAPI.search, 1000);
    render((
      <BrowserRouter>
        <MainSearch />
      </BrowserRouter>
    ));
    const inputSearch = screen.getByPlaceholderText('Location');
    expect(inputSearch).toBeInTheDocument();
    // inputSearch.simulate('change', { target: { value: 'Hello' } });
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'test' } });
    debouncedFunc();
    debouncedFunc.flush();
    expect(LocationAPI.search).toHaveBeenCalledTimes(1);
  });
});
