import { useState, useEffect, useCallback } from 'react';

const UseForm = (callback, validateErrors, validateAddRoomErrors, isSignIn, callBackFunction) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [room, setRoom] = useState({
    name: '',
    city: '',
    publicAddress: '',
    currency: '',
    amount: '',
    bedroomsCount: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setRoom({ ...room, [name]: value });
  }, [user, room]);

  const handleClear = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
    setRoom({
      name: '',
      city: '',
      publicAddress: '',
      currency: '',
      amount: '',
      bedroomsCount: '',
    });
    callBackFunction();
  };

  const handleSubmit = useCallback(() => {
    setErrors(validateErrors(user, isSignIn));
    setErrors(validateAddRoomErrors(user, room));
    setIsSubmitting(true);
  }, [user, isSignIn, room]);

  const clearError = () => {
    setErrors({});
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback(user);
        callback(room);
      }
    },
    [errors],
  );

  return {
    handleChange, handleSubmit, user, errors, clearError, handleClear, room,
  };
};

export default UseForm;
