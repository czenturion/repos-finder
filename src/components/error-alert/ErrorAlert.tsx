import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootStateT } from '@/store/store';

const ErrorAlert = () => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Предположим, что ошибка хранится в Redux state
  const error = useSelector((state: RootStateT) => state.repos.error);

  useEffect(() => {
    if (error) {
      // Когда появляется новая ошибка, показываем уведомление
      setErrorText(error.text);
      setOpen(true);

      // Скрываем уведомление через 5 секунд
      const timer = setTimeout(() => {
        setOpen(false);
        setErrorText(null);
      }, 5000);

      // Очищаем таймер при размонтировании компонента или изменении ошибки
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={5000}
    >
      <Alert severity="error" onClose={() => setOpen(false)}>
        {errorText}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert