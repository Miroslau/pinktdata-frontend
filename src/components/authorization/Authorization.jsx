import React from 'react';
import './Authorization.scss';
import PropTypes from 'prop-types';
import { authColumn } from '../../constants/authColumns';
import TextFieldMui from '../ui-components/text-field-mui/TextFieldMui';
import { validateErrors } from '../../mixins/validateErrors';
import ButtonMui from '../ui-components/button-mui/ButtonMui';
import useForm from '../../hooks/useForm';
import { authorizationLocalization } from '../../constants/Localizations/authorizationLocalization';

const {
  TITLE_SIGN_UP, TITLE_SIGN_IN, BUTTON_FORGOT_PASSWORD, TEXT,
} = authorizationLocalization;

const Authorization = function ({ isSignIn, submitForm, openForm }) {
  const {
    handleChange, handleSubmit, user, errors, handleClear,
  } = useForm(
    submitForm,
    validateErrors,
    isSignIn,
    openForm,
  );

  return (
    <div className="authorization">
      {
          authColumn.filter((column) => (isSignIn ? column.onlyLogin : column.onlyRegister))
            .map((column) => (
              <TextFieldMui
                variant="filled"
                key={column.id}
                value={user[`${column.model}`]}
                name={column.model}
                required={column.required}
                type={column.type}
                helperText={errors[`${column.model}`]}
                label={column.placeholder}
                inputText={handleChange}
              />
            ))
      }
      <div className="authorization-buttons__login">
        <ButtonMui title={isSignIn ? TITLE_SIGN_IN : TITLE_SIGN_UP} clickButton={handleSubmit} />
        {
          isSignIn && (
            <div className="authorization-buttons__login">
              <ButtonMui title={BUTTON_FORGOT_PASSWORD} clickButton={handleSubmit} />
              <div
                className="authorization__link"
                onClick={handleClear}
                role="presentation"
              >
                {TEXT}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

Authorization.propTypes = {
  isSignIn: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired,
};

export default Authorization;
