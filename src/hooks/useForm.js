import { useState, useEffect } from 'react';

const UseForm = (callback, validateErrors) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    setErrors(validateErrors(user));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback(user);
      }
    },
    [errors],
  );

  return {
    handleChange, handleSubmit, user, errors,
  };
};

export default UseForm;
