/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import '@testing-library/jest-dom';
import {
  render, fireEvent, findByText, waitFor, act,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import LocationAPI from '../../../../api/main-search/LocationAPI';
import MainSearch from './MainSearch';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../../api/main-search/LocationAPI');

jest.mock('../../../../utils/doWithUserDelay', () => ({
  doWithUserDelay: (callback) => callback(),
}));

describe('MainSearch component', () => {
  const setup = () => {
    LocationAPI.search = jest.fn().mockReturnValue(['Tafton, PA, United States',
      'Taghkanic, NY, United States',
      'Takoma Park, MD, United States']);

    const history = createMemoryHistory({ initialEntries: ['/'] });
    const utils = render(<BrowserRouter><Router history={history}><MainSearch /></Router></BrowserRouter>);
    const autocomplete = utils.getByTestId('autocomplete');
    const input = utils.getByPlaceholderText('Location');
    const button = utils.getByTestId('search-button');

    const selectOption = async () => {
      await act(async () => {
        autocomplete.focus();
        fireEvent.change(input, { target: { value: 't' } });
      });
      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
      fireEvent.keyDown(autocomplete, { key: 'Enter' });
    };

    return {
      button,
      autocomplete,
      input,
      history,
      selectOption,
      ...utils,
    };
  };

  it('should render Search form', () => {
    const { container } = setup();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render disabled button by default', () => {
    const { button } = setup();
    expect(button).toBeDisabled();
  });

  it('should select autocomplete option', async () => {
    const {
      input, selectOption,
    } = setup();
    await selectOption();
    expect(input.value).toBe('Taghkanic, NY, United States');
  });

  it('should activate button when option selected', async () => {
    const {
      button, selectOption,
    } = setup();
    await selectOption();
    expect(button).not.toBeDisabled();
  });

  it('should forward to map page when button clicked', async () => {
    const {
      button, selectOption, history,
    } = setup();
    await selectOption();
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/map');
  });

  it('should select first option on blur', async () => {
    const { input } = setup();
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: 't' } });
      expect(LocationAPI.search).toHaveBeenCalledTimes(1);
    });
    input.blur();
    expect(input.value).toBe('Tafton, PA, United States');
  });

  it('should select first option on blur1', async () => {
    const { input, container } = setup();
    const label = container.querySelector('#disable-close-on-select-label');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '' } });
      input.blur();
    });
    expect(input.value).toBe('');
    expect(label.classList.contains('Mui-error')).toBe(true);
  });
});
