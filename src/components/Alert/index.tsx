import React from 'react';
import { Alert, Stack } from '@mui/material';

import { AlertType } from '../../types/Alert';

type ShowMessageT = {
  type: AlertType;
  message: string;
};

const ShowMessage: React.FC<ShowMessageT> = props => {
  const { type, message } = props;

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>{message}</Alert>
    </Stack>
  );
};

export default ShowMessage;
