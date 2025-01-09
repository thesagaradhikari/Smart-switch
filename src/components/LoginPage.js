import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLayout from './FormLayout';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login check (replace with real API call or validation)
    if (email === 'user@example.com' && password === 'password') {
      // Call the onLogin function passed from App.js to set isAuthenticated to true
      onLogin();
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <FormLayout
      title="Hi there!"
      subtitle="Welcome to Lil' Pookie."
      footerText="Don't have an account?"
      footerLink="Sign up"
      footerPath="/register"
    >
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <div className="form-footer">
          <a href="#forgot-password" className="forgot-link">
            Forgot Password?
          </a>
          <button type="submit" className="form-button">
            Log in
          </button>
        </div>
      </form>
    </FormLayout>
  );
}

export default LoginPage;
