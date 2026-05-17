import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <img src="/images/logo.png" alt="Coca-Cola Logo" className="footer-logo" />
          <p className="footer-desc">Refreshing the world, one story at a time. Experience the magic of Coca-Cola.</p>
        </div>
        
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>Products</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}>Privacy Policy</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}>Terms of Service</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cookie'); }}>Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest flavors and offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Coca-Cola Company. All rights reserved. This is a demo project.</p>
      </div>
    </footer>
  );
};

export default Footer;
