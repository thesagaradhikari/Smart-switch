import React from 'react';
import FormLayout from './FormLayout';

function RegisterPage() {
  return (
    <FormLayout
      title="Hi there!"
      subtitle="Register to Lil' Pookie."
      footerText="Already have an account?"
      footerLink="Sign in"
      footerPath="/"
    >
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Your email" />
        <input type="password" placeholder="Password" />
        <div className="form-footer">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <button type="submit" className="form-button">Sign in</button>
        </div>
      </form>
    </FormLayout>
  );
}

export default RegisterPage;
