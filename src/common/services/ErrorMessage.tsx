import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? <div className='fs-12 text-danger'>{message}</div> : null;
};

export default ErrorMessage;