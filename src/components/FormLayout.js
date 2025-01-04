import React from 'react';
import { Link } from 'react-router-dom';
import './FormLayout.css';

function FormLayout({ title, subtitle, children, footerText, footerLink, footerPath }) {
  return (
    <div className="form-layout">
      <div className="image-section">
        <h1 className="brand-title">Home of</h1>
        <h1 className="brand-title">Devices</h1>   
        <h2 className="brand-title">Lil' Pookie</h2>
      </div>
      <div className="form-section">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        {children}
        <p className="footer-text">
          {footerText} <Link to={footerPath}>{footerLink}</Link>
        </p>
      </div>
    </div>
  );
}

export default FormLayout;
