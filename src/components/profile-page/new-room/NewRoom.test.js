import '@testing-library/jest-dom';
import {
  fireEvent, render, findByText, findByDisplayValue, screen,
} from '@testing-library/react';
import NewRoom from './NewRoom';

describe('New Room component', () => {
  const setActive = () => true;
  const sendForm = () => true;

  const elementsNewRoom = {
    inputName: null,
    inputPublicAddress: null,
    inputCity: null,
    inputCurrency: null,
    inputAmount: null,
    inputBedroomsCount: null,
    submit: null,
  };

  // eslint-disable-next-line no-unused-vars
  let container;
  let unmount;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    const { container: currentContainer, unmount: currentUnmount } = render(<NewRoom setActive={setActive} submitForm={sendForm} />);
    container = currentContainer;
    unmount = currentUnmount;
    // eslint-disable-next-line prefer-destructuring
    elementsNewRoom.inputName = currentContainer.querySelectorAll('input')[0];
    // eslint-disable-next-line prefer-destructuring
    elementsNewRoom.inputPublicAddress = currentContainer.querySelectorAll('input')[1];
    // eslint-disable-next-line prefer-destructuring
    elementsNewRoom.inputCity = currentContainer.querySelectorAll('input')[2];
    // eslint-disable-next-line prefer-destructuring
    elementsNewRoom.inputCurrency = currentContainer.querySelectorAll('input')[3];
    // eslint-disable-next-line prefer-destructuring
    elementsNewRoom.inputAmount = currentContainer.querySelectorAll('input')[4];
    // eslint-disable-next-line prefer-destructuring
    elementsNewRoom.inputBedroomsCount = currentContainer.querySelectorAll('input')[5];
    elementsNewRoom.submit = currentContainer.querySelector('.MuiButton-root');
  });

  afterEach(() => {
    unmount();
  });

  it('renders component Add New Room', () => {
    // eslint-disable-next-line no-shadow
    const { container } = render(<NewRoom setActive={setActive} submitForm={sendForm} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct input name of room', async () => {
    fireEvent.change(elementsNewRoom.inputName, { target: { value: 'Cozy studio dugout' } });
    fireEvent.blur(elementsNewRoom.inputName);
    fireEvent.click(elementsNewRoom.submit);
    const result = await findByDisplayValue(container, 'Cozy studio dugout');
    expect(result).toBeInTheDocument();
  });

  it('has name must be of length 2 to 255', async () => {
    fireEvent.change(elementsNewRoom.inputName, { target: { value: 'D' } });
    fireEvent.blur(elementsNewRoom.inputName);
    fireEvent.click(elementsNewRoom.submit);
    const error = await findByText(container, 'Must be of length 2 to 255');
    expect(error).toBeInTheDocument();
  });

  it('has name must be required', async () => {
    fireEvent.change(elementsNewRoom.inputName, { target: { value: '' } });
    fireEvent.blur(elementsNewRoom.inputName);
    fireEvent.click(elementsNewRoom.submit);
    const error = await findByText(container, 'Name required');
    expect(error).toBeInTheDocument();
  });

  it('has public address must be with placeholder text', async () => {
    const inputNode = screen.getByPlaceholderText('Enter room\'s address');
    expect(inputNode).toBeInTheDocument();
  });

  it('has correct city must including only alphabet characters', async () => {
    fireEvent.change(elementsNewRoom.inputCity, { target: { value: '123Benguela' } });
    fireEvent.blur(elementsNewRoom.inputCity);
    fireEvent.click(elementsNewRoom.submit);
    const error = await findByText(container, 'City must be alphabets only');
    expect(error).toBeInTheDocument();
  });
});
