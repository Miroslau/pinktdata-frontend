export const validateAddRoomErrors = (values) => {
  const errors = {};

  const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
  const REGX_ONLY_NUMBER = /^[\d]+$/;
  const REGEX_MIN_MAX_LETTERS = /^.{2,255}$/;

  if (!values.name.trim()) {
    errors.name = 'Name required';
  } else if (!REGEX_MIN_MAX_LETTERS.test(values.name)) {
    errors.name = 'Must be of length 2 to 255';
  }

  if (!values.city.trim()) {
    errors.city = 'City required';
  } else if (!REGX_ONLY_LETTER.test(values.city.trim())) {
    errors.city = 'City must be alphabets only';
  } else if (!REGEX_MIN_MAX_LETTERS.test(values.city)) {
    errors.city = 'Must be of length 2 to 255';
  }

  if (!values.publicAddress.trim()) {
    errors.publicAddress = 'Public address required';
  } else if (!REGEX_MIN_MAX_LETTERS.test(values.publicAddress)) {
    errors.publicAddress = 'Must be of length 2 to 255';
  }

  if (!values.amount.trim()) {
    errors.amount = 'Amount required';
  } else if (!REGX_ONLY_NUMBER.test(values.amount.trim())) {
    errors.amount = 'Amount must be numeric only';
  }

  if (!values.bedroomsCount.trim()) {
    errors.bedroomsCount = 'Bedrooms count required';
  } else if (!REGX_ONLY_NUMBER.test(values.bedroomsCount.trim())) {
    errors.bedroomsCount = 'Bedrooms count must be numeric only';
  }

  return errors;
};
