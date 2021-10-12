export const validateErrors = (values, typeAuth) => {
  const errors = {};

  if (typeAuth === 'signUp') {
    if (!values.firstName.trim()) {
      errors.firstName = 'First Name required';
    } else if (!/^[A-Za-z]*$/.test(values.firstName.trim())) {
      errors.firstName = 'Enter a valid name';
    } else if (values.firstName.length < 5 || values.firstName.length > 32) {
      errors.firstName = 'Must be of length 5 to 32';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Last Name required';
    } else if (!/^[A-Za-z]*$/.test(values.lastName.trim())) {
      errors.lastName = 'Enter a valid name';
    } else if (values.lastName.length < 5 || values.lastName.length > 32) {
      errors.lastName = 'Must be of length 5 to 32';
    }

    const mailFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    mailFormat.lastIndex = 0;
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!mailFormat.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])/.test(values.password)) {
      errors.password = '1 lowercase and 1 uppercase letter';
    } else if (!/^(?=.*?[0-9])/.test(values.password)) {
      errors.password = 'Must contain mix of letters and numbers';
    } else if (!/^(?=.*?[#?!@$%^&*-])/.test(values.password)) {
      errors.password = 'Must contain at least 1 special character';
    } else if (!/^.{7,12}$/.test(values.password)) {
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
