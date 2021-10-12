import React from 'react';
import './Authorization.scss';
import PropTypes from 'prop-types';
import { authColumn } from '../../constants/authColumns';
import TextFieldMui from '../ui-components/text-field-mui/TextFieldMui';
import { validateErrors } from '../../mixins/validateErrors';
import ButtonMui from '../ui-components/button-mui/ButtonMui';
import useForm from '../../hooks/useForm';

const forgotText = 'Don’t have an account? Sign up here!';

const Authorization = ({ isSignIn, submitForm, openForm }) => {
  const {
    handleChange, handleSubmit, user, errors,
  } = useForm(
    submitForm,
    validateErrors,
    isSignIn,
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
                inputText={(e) => handleChange(e)}
              />
            ))
      }
      <div className="authorization-buttons__login">
        <ButtonMui title={isSignIn ? 'Sign in' : 'Sign Up'} clickButton={handleSubmit} />
        {
          isSignIn && (
            <div className="authorization-buttons__login">
              <ButtonMui title="Forgot password" clickButton={handleSubmit} />
              <div
                className="authorization__link"
                onClick={openForm}
                role="presentation"
              >
                {forgotText}
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
