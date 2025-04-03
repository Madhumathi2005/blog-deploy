import React from 'react';
import './Footer.css'; // Add custom styles for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Blog App. All Rights Reserved.</p>
      <p>
        <a href="https://github.com/yourprofile">GitHub</a> |{' '}
        <a href="mailto:your@email.com">Email</a>
      </p>
    </footer>
  );
};

export default Footer;
