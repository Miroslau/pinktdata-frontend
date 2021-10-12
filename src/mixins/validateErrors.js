export const validateErrors = (values, isSignIn) => {
  const errors = {};

  const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
  const REGX_MAIL_FORMAT = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  REGX_MAIL_FORMAT.lastIndex = 0;
  const REGX_LOWER_UPPER_CASE = /^(?=.*?[A-Z])(?=.*?[a-z])/;
  const REGEX_MIX_LETTERS_NUMBERS = /^(?=.*?[0-9])/;
  const REGEX_SPECIAL_SYMBOL = /^(?=.*?[#?!@$%^&*-])/;
  const REGEX_MIN_MAX_LETTERS_PASSWORD = /^.{7,12}$/;
  const REGEX_MIN_MAX_LETTERS_NAME = /^.{5,32}$/;

  if (!isSignIn) {
    if (!values.firstName.trim()) {
      errors.firstName = 'First Name required';
    } else if (!REGX_ONLY_LETTER.test(values.firstName.trim())) {
      errors.firstName = 'Enter a valid name';
    } else if (!REGEX_MIN_MAX_LETTERS_NAME.test(values.firstName)) {
      errors.firstName = 'Must be of length 5 to 32';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last Name required';
    } else if (!REGX_ONLY_LETTER.test(values.lastName.trim())) {
      errors.lastName = 'Enter a valid name';
    } else if (!REGEX_MIN_MAX_LETTERS_NAME.test(values.lastName)) {
      errors.lastName = 'Must be of length 5 to 32';
    }

    if (!values.email) {
      errors.email = 'Email required';
    } else if (!REGX_MAIL_FORMAT.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (!REGX_LOWER_UPPER_CASE.test(values.password)) {
      errors.password = '1 lowercase and 1 uppercase letter';
    } else if (!REGEX_MIX_LETTERS_NUMBERS.test(values.password)) {
      errors.password = 'Must contain mix of letters and numbers';
    } else if (!REGEX_SPECIAL_SYMBOL.test(values.password)) {
      errors.password = 'Must contain at least 1 special character';
    } else if (!REGEX_MIN_MAX_LETTERS_PASSWORD.test(values.password)) {
      errors.password = 'must be of length 7 to 12';
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = 'Repeat Password required';
    } else if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords do not match';
    }
  } else {
    if (!values.email) {
      errors.email = 'Email required';
    }

    if (!values.password) {
      errors.password = 'Password required';
    }
  }
  return errors;
};
