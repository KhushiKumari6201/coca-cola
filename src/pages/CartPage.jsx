import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Pages.css';

const CartPage = ({ onNavigate }) => {
  const { cart, removeFromCart } = useContext(AppContext);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="page-container cart-container">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-subtitle">Review your items before checkout.</p>
      
      {cart.length === 0 ? (
        <div className="glass-panel empty-cart">
          <h2>Your cart is currently empty.</h2>
          <p>Go to the Products page to add some refreshing drinks!</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items glass-panel">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="action-btn delete">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary glass-panel">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Taxes & Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => onNavigate('checkout')}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
