import '@testing-library/jest-dom';
import {
  findByDisplayValue, findByText, fireEvent, render,
} from '@testing-library/react';
import Authorization from './Authorization';

describe('user registration', () => {
  const isSign = false;
  const openForm = () => true;
  const sendForm = () => true;

  const elementsAuthorization = {
    inputName: null,
    inputLastName: null,
    inputEmail: null,
    inputPassword: null,
    repeatPassword: null,
    submit: null,
  };

  let container;
  let unmount;

  beforeEach(() => {
    // eslint-disable-next-line max-len,react/react-in-jsx-scope
    const { container: currentContainer, unmount: currentUnmount } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    container = currentContainer;
    unmount = currentUnmount;
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.inputName = currentContainer.querySelectorAll('input')[0];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.inputLastName = currentContainer.querySelectorAll('input')[1];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.inputEmail = currentContainer.querySelectorAll('input')[2];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.inputPassword = currentContainer.querySelectorAll('input')[3];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.repeatPassword = currentContainer.querySelectorAll('input')[4];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.submit = currentContainer.querySelector('.MuiButton-root');
  });

  afterEach(() => {
    unmount();
  });

  it('renders component authorization', () => {
    // eslint-disable-next-line max-len,no-shadow
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct input First name', async () => {
    fireEvent.change(elementsAuthorization.inputName, { target: { value: 'Misha' } });
    fireEvent.blur(elementsAuthorization.inputName);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'Misha');
    expect(result).toBeInTheDocument();
  });

  it('has First name must be of length 2 to 32', async () => {
    fireEvent.change(elementsAuthorization.inputName, { target: { value: 'M' } });
    fireEvent.blur(elementsAuthorization.inputName);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Must be of length 2 to 32');
    expect(error).toBeInTheDocument();
  });

  it('has First name must be required', async () => {
    fireEvent.change(elementsAuthorization.inputName, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.inputName);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'First Name required');
    expect(error).toBeInTheDocument();
  });

  it('has correct First name must including only alphabetical characters', async () => {
    fireEvent.change(elementsAuthorization.inputName, { target: { value: 'Test123' } });
    fireEvent.blur(elementsAuthorization.inputName);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'First Name must be alphabets only');
    expect(error).toBeInTheDocument();
  });

  it('has correct input Last name', async () => {
    fireEvent.change(elementsAuthorization.inputLastName, { target: { value: 'Pusick' } });
    fireEvent.blur(elementsAuthorization.inputLastName);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'Pusick');
    expect(result).toBeInTheDocument();
  });

  it('has Last name must be of length 2 to 32', async () => {
    fireEvent.change(elementsAuthorization.inputLastName, { target: { value: 'M' } });
    fireEvent.blur(elementsAuthorization.inputLastName);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Must be of length 2 to 32');
    expect(error).toBeInTheDocument();
  });

  it('has Last name must be required', async () => {
    fireEvent.change(elementsAuthorization.inputLastName, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.inputLastName);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'First Name required');
    expect(error).toBeInTheDocument();
  });

  it('has correct Last name must including only alphabetical characters', async () => {
    fireEvent.change(elementsAuthorization.inputLastName, { target: { value: 'Test123' } });
    fireEvent.blur(elementsAuthorization.inputLastName);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Last Name must be alphabets only');
    expect(error).toBeInTheDocument();
  });

  it('has correct input Email', async () => {
    fireEvent.change(elementsAuthorization.inputEmail, { target: { value: 'mysite@ourearth.com' } });
    fireEvent.blur(elementsAuthorization.inputEmail);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'mysite@ourearth.com');
    expect(result).toBeInTheDocument();
  });

  it('has correct Email must be valid email', async () => {
    fireEvent.change(elementsAuthorization.inputEmail, { target: { value: '.email@example.com' } });
    fireEvent.blur(elementsAuthorization.inputEmail);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Email address is invalid');
    expect(error).toBeInTheDocument();
  });

  it('has correct Email must be required', async () => {
    fireEvent.change(elementsAuthorization.inputEmail, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.inputEmail);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Email required');
    expect(error).toBeInTheDocument();
  });

  it('has correct input Password', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'Mira$1234' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'Mira$1234');
    expect(result).toBeInTheDocument();
  });

  it('has correct Password must be required', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Password required');
    expect(error).toBeInTheDocument();
  });

  it('has correct Password must contain mix of letters and numbers', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'Mira$' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Must contain mix of letters and numbers');
    expect(error).toBeInTheDocument();
  });

  it('has correct Password must contain at least 1 special character', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'Mira123' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Must contain at least 1 special character');
    expect(error).toBeInTheDocument();
  });

  it('has correct Password must contain at least 1 lowercase letter and 1 uppercase letter', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'MIRA123' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, '1 lowercase and 1 uppercase letter');
    expect(error).toBeInTheDocument();
  });

  it('has correct Password must contain at least 1 lowercase letter and 1 uppercase letter', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'mira123' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, '1 lowercase and 1 uppercase letter');
    expect(error).toBeInTheDocument();
  });

  it('has correct Password must be of length 7 to 12', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'Mi$123' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'must be of length 7 to 12');
    expect(error).toBeInTheDocument();
  });

  it('has correct Password must be of length 7 to 12', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'Miroslav$1234t' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'must be of length 7 to 12');
    expect(error).toBeInTheDocument();
  });

  it('has correct input Repeat password', async () => {
    fireEvent.change(elementsAuthorization.repeatPassword, { target: { value: 'Miroslav$1234t' } });
    fireEvent.blur(elementsAuthorization.repeatPassword);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'Miroslav$1234t');
    expect(result).toBeInTheDocument();
  });

  it('has correct Repeat password must be required', async () => {
    fireEvent.change(elementsAuthorization.repeatPassword, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.repeatPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Repeat Password required');
    expect(error).toBeInTheDocument();
  });
});

describe('user login', () => {
  const isSign = true;
  const openForm = () => true;
  const sendForm = () => true;

  const elementsAuthorization = {
    inputEmail: null,
    inputPassword: null,
    submit: null,
  };

  let container;
  let unmount;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    const { container: currentContainer, unmount: currentUnmount } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    container = currentContainer;
    unmount = currentUnmount;
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.inputEmail = currentContainer.querySelectorAll('input')[0];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.inputPassword = currentContainer.querySelectorAll('input')[1];
    // eslint-disable-next-line prefer-destructuring
    elementsAuthorization.submit = currentContainer.querySelector('.MuiButton-root');
  });

  afterEach(() => {
    unmount();
  });

  it('has correct input Email', async () => {
    fireEvent.change(elementsAuthorization.inputEmail, { target: { value: 'mysite@ourearth.com' } });
    fireEvent.blur(elementsAuthorization.inputEmail);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'mysite@ourearth.com');
    expect(result).toBeInTheDocument();
  });

  it('has correct Email must be required', async () => {
    fireEvent.change(elementsAuthorization.inputEmail, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.inputEmail);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Email required');
    expect(error).toBeInTheDocument();
  });

  it('has correct input Password', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: 'Mira$1234' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const result = await findByDisplayValue(container, 'Mira$1234');
    expect(result).toBeInTheDocument();
  });

  it('has correct Password must be required', async () => {
    fireEvent.change(elementsAuthorization.inputPassword, { target: { value: '' } });
    fireEvent.blur(elementsAuthorization.inputPassword);
    fireEvent.click(elementsAuthorization.submit);
    const error = await findByText(container, 'Password required');
    expect(error).toBeInTheDocument();
  });
});
