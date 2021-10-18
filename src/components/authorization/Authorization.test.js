import { fireEvent, getByPlaceholderText, render } from '@testing-library/react';
import Authorization from './Authorization';

// eslint-disable-next-line no-undef
describe('Valid input', () => {
  const isSign = false;
  const openForm = () => true;
  const sendForm = () => true;
  const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
  const REGX_MAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // eslint-disable-next-line no-undef
  it('render correctly', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter First Name/i);
    fireEvent.change(inputName, { target: { value: 'Miraslau' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct First name', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter First Name/i);
    fireEvent.change(inputName, { target: { value: 'Misha' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct First name', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter First Name/i);
    fireEvent.change(inputName, { target: { value: 'Andrey' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct First name', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter Last Name/i);
    fireEvent.change(inputName, { target: { value: 'Ivanov' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct First name', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter Last Name/i);
    fireEvent.change(inputName, { target: { value: 'Sidarov' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_ONLY_LETTER);
  });

  // eslint-disable-next-line no-undef
  it('correct email', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter email/i);
    fireEvent.change(inputName, { target: { value: 'mysite@ourearth.com' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_MAIL_FORMAT);
  });

  // eslint-disable-next-line no-undef
  it('correct email', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter email/i);
    fireEvent.change(inputName, { target: { value: 'my.ownsite@ourearth.org' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_MAIL_FORMAT);
  });

  // eslint-disable-next-line no-undef
  it('correct email', () => {
    // eslint-disable-next-line react/react-in-jsx-scope,max-len
    const { container } = render(<Authorization openForm={openForm} isSignIn={isSign} submitForm={sendForm} />);
    const inputName = getByPlaceholderText(container, /Enter email/i);
    fireEvent.change(inputName, { target: { value: 'mysite@you.me.net' } });
    // eslint-disable-next-line no-undef
    expect(inputName.value).toMatch(REGX_MAIL_FORMAT);
  });
});
