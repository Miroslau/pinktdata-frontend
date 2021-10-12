import React from 'react';
import './Auth.scss';
import PropTypes from 'prop-types';
import { authColumn } from '../../constants/authColumns';
import InputText from '../Input/InputText';
import { validateErrors } from '../../mixins/validateErrors';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import useForm from '../../hooks/useForm';

const Auth = ({ auth, submitForm, openForm }) => {
  const {
    handleChange, handleSubmit, user, errors,
  } = useForm(
    submitForm,
    validateErrors,
    auth,
  );
  return (
    <div className="authorization">
      <h2 className="authorization__title">{auth === 'signUp' ? 'Sign up' : 'Sign in'}</h2>
      {
            authColumn.filter((column) => (auth === 'signUp' ? column.onlyRegister : column.onlyLogin))
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
                    <InputText
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
              auth === 'signUp' && <ButtonComponent title="Sign up" clickButton={handleSubmit} />
        }
        {
              auth === 'signIn' && (
              <div className="authorization-buttons__login">
                <ButtonComponent title="Login" clickButton={handleSubmit} />
                <ButtonComponent title="Forgot password" clickButton={handleSubmit} />
                <div
                  className="authorization__link"
                  onClick={openForm}
                  role="presentation"
                >
                  Don’t have an account? Sign up here!
                </div>
              </div>
              )
        }
      </div>
    </div>
  );
};

Auth.propTypes = {
  auth: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired,
};

export default Auth;
