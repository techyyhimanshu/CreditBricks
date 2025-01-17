import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css'; // Make sure this is imported

// Custom message component with your app's styling
const ToastMessage = ({ message }: { message: string }) => (
  <div className="d-flex align-items-center">
    <div className="notification-icon">
      {/* You can add custom icons here if needed */}
    </div>
    <div className="notification-message">
      <p className="mb-0">{message}</p>
    </div>
  </div>
);

// Custom toast configuration to match your app's design
const toastConfig = {
  position: toast.POSITION.TOP_CENTER,
  hideProgressBar: true,
  closeButton: false,
  transition: Slide,
  className: 'custom-toast',
  bodyClassName: 'custom-toast-body',
  toastClassName: 'custom-toast-container',
  autoClose: 3000,
  style: {
    background: 'var(--primary-bg)',
    color: 'var(--primary-text)',
    borderRadius: '8px',
    padding: '12px 24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '300px'
  }
};

// Add this CSS to your styles
const styles = `
.custom-toast {
  border-radius: 8px !important;
  min-width: 300px;
}

.Toastify__toast--success {
  background: #1a6b54 !important;
  color: white !important;
}

.Toastify__toast--error {
  background: #dc3545 !important;
  color: white !important;
}

.Toastify__toast--warning {
  background: #ffc107 !important;
  color: #000 !important;
}

.Toastify__toast--info {
  background: #0dcaf0 !important;
  color: white !important;
}

.Toastify__toast-container {
  padding: 0;
}
`;

const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
  const toastFunction = toast[type];
  toastFunction(
    <ToastMessage message={message} />,
    {
      ...toastConfig,
      className: `custom-toast ${type}`
    }
  );
};

// Use this component in your app root
const CustomToastContainer = () => (
  <>
    <style>{styles}</style>
    <ToastContainer
      position="top-center"
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="colored"
    />
  </>
);

export { showToast, CustomToastContainer };