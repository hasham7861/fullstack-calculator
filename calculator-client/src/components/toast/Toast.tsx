import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

const ToastWrapper: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000} // 3 seconds of autoclose
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export { ToastWrapper, toast };
