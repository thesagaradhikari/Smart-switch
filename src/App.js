import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  // Check authentication from localStorage (or sessionStorage) on app load
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('authToken') !== null);

  // Handle login (set authentication state and token)
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'your-token'); // Simulate storing an auth token
  };

  // Handle logout (clear authentication state and token)
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    // Sync authentication state with localStorage
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(token !== null);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {/* Registration Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch-all route to redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
