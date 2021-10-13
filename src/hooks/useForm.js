import { useState, useEffect, useCallback } from 'react';

const UseForm = (callback, validateErrors, isSignIn) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }, [user]);

  const handleSubmit = useCallback(() => {
    setErrors(validateErrors(user, isSignIn));
    setIsSubmitting(true);
  }, [user, isSignIn]);

  const clearError = () => {
    setErrors({});
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
    handleChange, handleSubmit, user, errors, clearError,
  };
};

export default UseForm;
