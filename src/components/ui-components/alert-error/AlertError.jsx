import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import roomPreviewLocalization from '../../../constants/roomPreviewLocalization';

const AlertError = () => (
  <Alert severity="error">
    <AlertTitle>{roomPreviewLocalization.error}</AlertTitle>
    {roomPreviewLocalization.errorText}
    <strong>{roomPreviewLocalization.reload}</strong>
  </Alert>
);

export default AlertError;
