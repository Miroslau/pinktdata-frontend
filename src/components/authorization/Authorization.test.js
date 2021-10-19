import { fireEvent, render } from '@testing-library/react';
import Authorization from './Authorization';

// eslint-disable-next-line no-undef
describe('Valid input', () => {
  const isSign = false;
  const openForm = () => true;
  const sendForm = () => true;
  const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
  const REGX_MAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  // eslint-disable-next-line max-len,react/react-in-jsx-scope
  const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
  const inputName = container.querySelectorAll('input')[0];
  const inputLastName = container.querySelectorAll('input')[1];
  const inputEmail = container.querySelectorAll('input')[2];
  const inputPassword = container.querySelectorAll('input')[3];
  // eslint-disable-next-line no-undef
  it('render correctly', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
  });

  // eslint-disable-next-line no-undef
  it('correct First name only alphabet', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputName, { target: { value: 'Misha' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct First name must be of length 5 to 32', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputName, { target: { value: 'Andrey123' } });
    // eslint-disable-next-line no-undef

    const validName = () => {
      if (!/^[A-Za-z]*$/.test(inputName.value)) throw Error('Must only alphabet');
    };

    // eslint-disable-next-line no-undef
    expect(validName).toThrowError();
  });

  // eslint-disable-next-line no-undef
  it('correct Last name', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputLastName, { target: { value: 'Ivanov' } });
    // eslint-disable-next-line no-undef
    expect(inputLastName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct Last name', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputLastName, { target: { value: 'Sidarov434' } });
    const validName = () => {
      if (!REGX_ONLY_LETTER.test(inputLastName.value)) throw Error('Must only alphabet and length 5 to 32');
    };

    // eslint-disable-next-line no-undef
    expect(validName).toThrowError();
  });

  // eslint-disable-next-line no-undef
  it('correct email', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputEmail, { target: { value: 'mysite@ourearth.com' } });
    // eslint-disable-next-line no-undef
    expect(inputEmail.value).toMatch(REGX_MAIL_FORMAT);
  });

  // eslint-disable-next-line no-undef
  it('correct email', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputEmail, { target: { value: 'email..email@example.com' } });

    const validEmail = () => {
      if (!REGX_MAIL_FORMAT.test(inputLastName.value)) throw Error('Not correct email');
    };

    // eslint-disable-next-line no-undef
    expect(validEmail).toThrowError();
  });

  // eslint-disable-next-line no-undef
  it('correct password', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    fireEvent.change(inputPassword, { target: { value: 'Mira$1234' } });
    // eslint-disable-next-line no-undef
    expect(inputPassword.value).toMatch(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,12}$/);
  });

  // eslint-disable-next-line no-undef
  it('not correct password', () => {
    fireEvent.change(inputPassword, { target: { value: 'Mm' } });
    const validPassowrd = (value) => {
      const regxp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,12}$/;
      if (!regxp.test(value)) throw Error('Must be one number, length must be 7 to 12');
    };

    // eslint-disable-next-line no-undef
    expect(() => validPassowrd(inputPassword.value)).toThrowError();
  });

  // eslint-disable-next-line no-undef
  it('not correct password', () => {
    fireEvent.change(inputPassword, { target: { value: 'Misha$$' } });
    const validPassowrd = (value) => {
      const regxp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,12}$/;
      if (!regxp.test(value)) throw Error('Must be one number');
    };

    // eslint-disable-next-line no-undef
    expect(() => validPassowrd(inputPassword.value)).toThrowError();
  });
});
