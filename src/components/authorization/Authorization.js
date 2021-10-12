import React from 'react';
import './Authorization.scss';
import PropTypes from 'prop-types';
import { authColumn } from '../../constants/authColumns';
import TextFieldMui from '../ui-components/text-field-mui/TextFieldMui';
import { validateErrors } from '../../mixins/validateErrors';
import ButtonMui from '../ui-components/button-mui/ButtonMui';
import useForm from '../../hooks/useForm';

const SIGN_UP = 'signUp';

const forgotText = 'Don’t have an account? Sign up here!';

const Authorization = ({ auth, submitForm, openForm }) => {
  const {
    handleChange, handleSubmit, user, errors,
  } = useForm(
    submitForm,
    validateErrors,
    auth,
  );
  return (
    <div className="authorization">
      <h2 className="authorization__title">{auth === SIGN_UP ? 'Sign up' : 'Sign in'}</h2>
      {
          authColumn.filter((column) => (auth === SIGN_UP ? column.onlyRegister : column.onlyLogin))
            .map((column) => (
              <div
                className="authorization-content"
                key={column.id}
              >
                <div
                  key={column.id}
                  className="authorization-content__label"
                >
                  {column.title}
                </div>
                <div className="authorization-content__input">
                  <TextFieldMui
                    variant="outlined"
                    value={user[`${column.model}`]}
                    name={column.model}
                    required={column.required}
                    type={column.type}
                    helperText={errors[`${column.model}`]}
                    placeholder={column.placeholder}
                    inputText={(e) => handleChange(e)}
                  />
                </div>
              </div>
            ))
      }
      <div className="authorization-buttons">
        {
              auth === SIGN_UP && <ButtonMui title="Sign up" clickButton={handleSubmit} />
        }
        {
              auth === 'signIn' && (
              <div className="authorization-buttons__login">
                <ButtonMui title="Login" clickButton={handleSubmit} />
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
  auth: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired,
};

export default Authorization;
