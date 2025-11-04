import React from 'react';
import Button from './Button'; 
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <Button type="submit">Login</Button>
        </form>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default LoginModal;
