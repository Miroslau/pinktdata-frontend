import React from 'react';
import './Auth.scss';
import PropTypes from 'prop-types';
import { registerColumn } from '../../constants/authColumns';
import InputText from '../Input/InputText';
import { validateErrors } from '../../mixins/validateErrors';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import useForm from '../../hooks/useForm';

const Auth = ({ auth, sign }) => {
  const {
    handleChange, handleSubmit, user, errors,
  } = useForm(
    sign,
    validateErrors,
  );
  return (
    <div className="authorization">
      <h2 className="authorization__title">{auth === 'signUp' ? 'Sign up' : 'Sign in'}</h2>
      {
        auth === 'signUp' && registerColumn.map((column) => (
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
        <ButtonComponent title="Sign up" clickButton={handleSubmit} />
      </div>
    </div>
  );
};

Auth.propTypes = {
  auth: PropTypes.string.isRequired,
  sign: PropTypes.func.isRequired,
};

export default Auth;
