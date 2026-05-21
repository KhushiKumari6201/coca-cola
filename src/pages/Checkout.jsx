import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Checkout.css';

const Checkout = ({ onNavigate }) => {
  const { cart } = useContext(AppContext);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 500 ? 0 : 99;
  const tax = Math.round(total * 0.05 * 100) / 100; // 5% GST
  const grandTotal = total + shipping + tax;

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Valid 10-digit phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    }

    if (currentStep === 2) {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 3) {
        // Process order
        handleCompleteOrder();
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      onNavigate('checkout-success', grandTotal);
    }, 2000);
  };

  return (
    <div className="checkout-container">
      {/* Progress Bar */}
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="progress-line" style={{ width: step > 1 ? '100%' : '0%' }}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="progress-line" style={{ width: step > 2 ? '100%' : '0%' }}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        {/* Main Form */}
        <div className="checkout-form-section">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="form-step animated">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className={errors.zipCode ? 'error' : ''}
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <select name="country" value={formData.country} onChange={handleInputChange}>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="form-step animated">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div
                  className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                >
                  <div className="payment-icon">💳</div>
                  <div className="payment-info">
                    <h3>Credit/Debit Card</h3>
                    <p>Visa, Mastercard, American Express</p>
                  </div>
                  <input type="radio" name="payment" value="card" checked={formData.paymentMethod === 'card'} onChange={() => {}} />
                </div>

                <div
                  className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                >
                  <div className="payment-icon">📱</div>
                  <div className="payment-info">
                    <h3>UPI</h3>
                    <p>Google Pay, PhonePe, Paytm</p>
                  </div>
                  <input type="radio" name="payment" value="upi" checked={formData.paymentMethod === 'upi'} onChange={() => {}} />
                </div>

                <div
                  className={`payment-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'netbanking' }))}
                >
                  <div className="payment-icon">🏦</div>
                  <div className="payment-info">
                    <h3>Net Banking</h3>
                    <p>All major banks supported</p>
                  </div>
                  <input type="radio" name="payment" value="netbanking" checked={formData.paymentMethod === 'netbanking'} onChange={() => {}} />
                </div>

                <div
                  className={`payment-option ${formData.paymentMethod === 'wallet' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'wallet' }))}
                >
                  <div className="payment-icon">👛</div>
                  <div className="payment-info">
                    <h3>Digital Wallet</h3>
                    <p>Amazon Pay, Apple Pay, etc.</p>
                  </div>
                  <input type="radio" name="payment" value="wallet" checked={formData.paymentMethod === 'wallet'} onChange={() => {}} />
                </div>

                <div
                  className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                >
                  <div className="payment-icon">🚚</div>
                  <div className="payment-info">
                    <h3>Cash on Delivery</h3>
                    <p>Pay when you receive your order</p>
                  </div>
                  <input type="radio" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={() => {}} />
                </div>
              </div>

              {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}

              <div className="security-info">
                <span className="security-icon">🔒</span>
                <p>Your payment information is encrypted and secure.</p>
              </div>
            </div>
          )}

          {/* Step 3: Review Order */}
          {step === 3 && (
            <div className="form-step animated">
              <h2>Review Your Order</h2>

              <div className="review-section">
                <h3>Shipping Details</h3>
                <p><strong>{formData.firstName} {formData.lastName}</strong></p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                <p>{formData.country}</p>
                <p className="text-gray">Email: {formData.email}</p>
                <p className="text-gray">Phone: {formData.phone}</p>
              </div>

              <div className="review-section">
                <h3>Payment Method</h3>
                <p>
                  {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                  {formData.paymentMethod === 'upi' && 'UPI'}
                  {formData.paymentMethod === 'netbanking' && 'Net Banking'}
                  {formData.paymentMethod === 'wallet' && 'Digital Wallet'}
                  {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                </p>
              </div>

              <div className="review-section">
                <h3>Order Items</h3>
                <div className="review-items">
                  {cart.map(item => (
                    <div key={item.id} className="review-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="terms-check">
                <input type="checkbox" id="terms" defaultChecked />
                <label htmlFor="terms">
                  I agree to the <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms of Service</a>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-details">
                  <p>{item.name}</p>
                  <small>Qty: {item.quantity}</small>
                </div>
                <span className="summary-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-breakdown">
            <div className="breakdown-row">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Tax (5% GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="breakdown-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

          {shipping === 0 && (
            <div className="free-shipping-badge">✓ Free Shipping Applied!</div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="checkout-actions">
        <button
          className="btn-back"
          onClick={handleBack}
          disabled={step === 1}
        >
          ← Back
        </button>
        <button
          className="btn-next"
          onClick={handleNext}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            step === 3 ? 'Complete Order' : 'Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
