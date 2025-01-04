import React from 'react';
import FormLayout from './FormLayout';

function LoginPage() {
  return (
    <FormLayout
      title="Hi there!"
      subtitle="Welcome to Lil' Pookie."
      footerText="Don't have an account?"
      footerLink="Sign up"
      footerPath="/register"
    >
      <form>
        <input type="email" placeholder="Your email" />
        <input type="password" placeholder="Password" />
        <div className="form-footer">
        <a href="#forgot-password" className="forgot-link">Forgot Password?</a>
          <button type="submit" className="form-button">Log in</button>
          
        </div>
      </form>
    </FormLayout>
  );
}

export default LoginPage;
