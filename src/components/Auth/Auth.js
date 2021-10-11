import React, { useState } from 'react';
import './Auth.scss';
import PropTypes from 'prop-types';
import { registerColumn } from '../../constants/authColumns';
import InputText from '../Input/InputText';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const Auth = ({ auth }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const inputInfo = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
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
                        inputText={(e) => inputInfo(e)}
                      />
                    </div>
                  </div>
                ))
            }
      {
                auth === 'signIn' && <div>22</div>
            }
      <div className="authorization-buttons">
        <ButtonComponent title="Register" />
      </div>
    </div>
  );
};

Auth.propTypes = {
  auth: PropTypes.string.isRequired,
};

export default Auth;
