import { useEffect } from 'react';
import '../css/Toast.css';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{type === 'error' ? '✕' : '✓'}</span>
      <span className="toast__text">{message}</span>
    </div>
  );
}

export default Toast;