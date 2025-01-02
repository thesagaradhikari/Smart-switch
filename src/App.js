import React from 'react';
import './App.css';

function App() {
  return (
    <div className="login-page">
      <div className="image-section">
        <h1 className="brand-title">Home of Devices</h1>
        <h2 className="brand-subtitle">Lil' Pookie</h2>
      </div>
      <div className="form-section">
        <h1>Hi there!</h1>
        <p>Welcome to Lil' Pookie.</p>
        <form>
          <input type="email" placeholder="Your email" />
          <input type="password" placeholder="Password" />
          <div className="form-footer">
            <button type="submit" className="login-button">Log in</button>
            <a href="#forgot-password" className="forgot-link">Forgot Password?</a>
          </div>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
        <div className="divider">
          <span>Or</span>
        </div>
        <div className="toggle-switch">
          <div className="switch-circle"></div>
          <div className="switch-circle"></div>
          <div className="switch-circle"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
