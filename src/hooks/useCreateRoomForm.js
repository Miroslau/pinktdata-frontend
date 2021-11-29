import { useState, useEffect, useCallback } from 'react';

const UseForm = (validateRoomErrors, callback, callBackFunction) => {
  const [room, setRoom] = useState({
    name: '',
    city: '',
    publicAddress: '',
    amount: '',
    bedroomsCount: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  }, [room]);

  const handleClear = () => {
    setRoom({
      name: '',
      city: '',
      publicAddress: '',
      amount: '',
      bedroomsCount: '',
    });
    callBackFunction();
  };

  const handleSubmit = useCallback(() => {
    setErrors(validateRoomErrors(room));
    setIsSubmitting(true);
  }, [room]);

  const clearError = () => {
    setErrors({});
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback(room);
      }
    },
    [errors],
  );

  return {
    handleChange, handleSubmit, room, errors, clearError, handleClear,
  };
};

export default UseForm;
