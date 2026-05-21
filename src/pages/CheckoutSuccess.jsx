import React from 'react';
import './CheckoutSuccess.css';

const CheckoutSuccess = ({ totalAmount, onNavigate }) => {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="checkout-success-container">
      <div className="success-card">
        {/* Success Animation */}
        <div className="success-checkmark">
          <div className="check-icon">✓</div>
        </div>

        {/* Main Message */}
        <h1>Order Placed Successfully!</h1>
        <p className="success-subtitle">Thank you for your order. Your delicious drinks are on the way!</p>

        {/* Order Details */}
        <div className="order-details-grid">
          <div className="detail-card">
            <div className="detail-icon">📦</div>
            <div className="detail-content">
              <label>Order Number</label>
              <p className="order-number">{orderNumber}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">💰</div>
            <div className="detail-content">
              <label>Total Amount</label>
              <p className="amount">₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">🚚</div>
            <div className="detail-content">
              <label>Estimated Delivery</label>
              <p className="delivery-date">{estimatedDelivery}</p>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">✉️</div>
            <div className="detail-content">
              <label>Confirmation Sent</label>
              <p className="email">Check your email for confirmation</p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="whats-next">
          <h2>What's Next?</h2>
          <ul>
            <li>
              <span className="step-num">1</span>
              <span>You'll receive an order confirmation email shortly</span>
            </li>
            <li>
              <span className="step-num">2</span>
              <span>Track your order using your order number</span>
            </li>
            <li>
              <span className="step-num">3</span>
              <span>Receive your products and enjoy them!</span>
            </li>
            <li>
              <span className="step-num">4</span>
              <span>Share your feedback and get rewards</span>
            </li>
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges-section">
          <div className="trust-badge">
            <span className="badge-icon">🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">📱</span>
            <span>Order Tracking</span>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">💯</span>
            <span>Money-back Guarantee</span>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">🎁</span>
            <span>Earn Rewards</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button className="btn-continue" onClick={() => onNavigate('products')}>
            Continue Shopping
          </button>
          <button className="btn-home" onClick={() => onNavigate('home')}>
            Back to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="success-footer">
          <p>
            Have any questions? 
            <a href="#contact"> Contact our support team</a> or check 
            <a href="#faq"> frequently asked questions</a>
          </p>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="floating-bubble bubble-1">🎉</div>
      <div className="floating-bubble bubble-2">🛍️</div>
      <div className="floating-bubble bubble-3">⭐</div>
    </div>
  );
};

export default CheckoutSuccess;
