/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import '@testing-library/jest-dom';
import {
  render, fireEvent, act, screen,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import LocationAPI from '../../../../api/main-search/LocationAPI';
import MainSearch from './MainSearch';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
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
    const utils = render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
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

  it('should highlight input when no value', async () => {
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

  test('renders component bedroom count', () => {
    const history = createMemoryHistory();
    render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
    expect(screen.getByText('Bedroom count')).toBeInTheDocument();
  });

  test('has open popup when click on label', async () => {
    const history = createMemoryHistory();
    render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
    const button = screen.getByText(/bedroom count/i);
    fireEvent.click(button);
    const popupText = await screen.findByText('Select the number of rooms');
    expect(popupText).toBeInTheDocument();
  });

  test('has change count bedrooms when click button plus', async () => {
    const history = createMemoryHistory();
    render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonAdd = await screen.getByRole('button', { name: /add/i });
    fireEvent.click(buttonAdd);
    const textLabelAdd = await screen.findByText(/Bedroom count: 1/i);
    expect(textLabelAdd).toBeInTheDocument();
  });

  test('has change count bedrooms when click button minus', async () => {
    const history = createMemoryHistory();
    render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
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

  test('has not change count bedrooms when click the button plus if bedrooms more 8', async () => {
    const history = createMemoryHistory();
    render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonAdd = await screen.getByRole('button', { name: /add/i });
    const countClick = [...Array(9)];
    countClick.forEach(() => fireEvent.click(buttonAdd));
    const textLabelAdd = await screen.findByText(/Bedroom count: 8/i);
    expect(textLabelAdd).toBeInTheDocument();
  });

  test('has not change count bedrooms when click the button minus if bedrooms 0', async () => {
    const history = createMemoryHistory();
    render(<Router location={history.location} navigator={history}><MainSearch /></Router>);
    const textLabel = await screen.findByText(/Bedroom count/i);
    fireEvent.click(textLabel);
    const buttonRemove = await screen.getByRole('button', { name: /remove/i });
    const countClick = [...Array(9)];
    countClick.forEach(() => fireEvent.click(buttonRemove));
    const textLabelAdd = await screen.findByText(/0/i);
    expect(textLabelAdd).toBeInTheDocument();
  });
});
