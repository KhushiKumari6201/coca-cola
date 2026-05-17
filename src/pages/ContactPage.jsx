import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a31a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a31a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a31a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a31a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    orderNumber: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: '', email: '', inquiryType: 'general', orderNumber: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-text">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-title"
          >
            Get in <span className="text-highlight">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-subtitle"
          >
            Need help with an order, interested in bulk purchasing, or want to become a retail partner? Our dedicated sales and support team is here to assist you with all your business and consumer needs.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="contact-grid">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="contact-info-card glass-panel"
          >
            <h2>Contact Information</h2>
            <p className="info-desc">Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="info-items">
              <div className="info-item">
                <div className="icon-wrapper">
                  <PhoneIcon />
                </div>
                <div>
                  <h4>Customer Support & Sales</h4>
                  <p>1800-208-2653 (Toll-Free)</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="icon-wrapper">
                  <MailIcon />
                </div>
                <div>
                  <h4>Business Inquiries</h4>
                  <p>sales.india@coca-cola.com</p>
                  <p style={{marginTop: '4px', fontSize: '0.85rem'}}>support@coca-cola.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="icon-wrapper">
                  <MapPinIcon />
                </div>
                <div>
                  <h4>Corporate Office & Main Hub</h4>
                  <p>Enkay Towers, Udyog Vihar Phase V<br/>Gurugram, Haryana 122016<br/>India</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="icon-wrapper">
                  <ClockIcon />
                </div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>
            
            <div className="social-links-contact">
              {/* Add social links if needed */}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="contact-form-card glass-panel"
          >
            {isSubmitted ? (
              <div className="success-message">
                <CheckCircleIcon />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a Message</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name / Company Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formState.name} 
                      onChange={handleChange} 
                      required 
                      placeholder="John Doe / Acme Corp"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email} 
                      onChange={handleChange} 
                      required 
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select 
                      id="inquiryType" 
                      name="inquiryType" 
                      value={formState.inquiryType} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="bulk">Bulk Orders / B2B</option>
                      <option value="partner">Partnership / Distribution</option>
                      <option value="returns">Returns & Refunds</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="orderNumber">Order Number (Optional)</label>
                    <input 
                      type="text" 
                      id="orderNumber" 
                      name="orderNumber" 
                      value={formState.orderNumber} 
                      onChange={handleChange} 
                      placeholder="#ORD-12345"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formState.message} 
                    onChange={handleChange} 
                    required 
                    rows="5"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  <span>Send Message</span>
                  <SendIcon />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe 
            src="https://maps.google.com/maps?q=Coca-Cola%20India%20Pvt.%20Ltd.,%20Gurugram&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Coca-Cola India Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
