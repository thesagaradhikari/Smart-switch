import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

function App() {
  // Check authentication from localStorage (or sessionStorage) on app load
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('authToken') !== null
  );

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
    // Ensure `isAuthenticated` state stays in sync with localStorage
    setIsAuthenticated(localStorage.getItem('authToken') !== null);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={<LoginPage onLogin={handleLogin} />}
        />
        
        {/* Registration Page */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch-all route to redirect to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
