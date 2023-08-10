import { toast } from 'react-toastify';

export const showToast = (message, type = 'info') => {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  switch (type) {
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'warning':
      toast.warn(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

