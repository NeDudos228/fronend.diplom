// components/Footer.js
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>

        <div className='footer-links'>
        <p>© 2024 Your Company. All rights reserved.</p>
          <a href='/about'>About Us</a>
          <a href='/contact'>Contact</a>
          <a href='/privacy'>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
