import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './ProductDetail.css';

const ProductDetail = ({ productId, onNavigate }) => {
  const { products, addToCart } = useContext(AppContext);
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('250ml');
  const [showNotification, setShowNotification] = useState(false);

  if (!product) {
    return (
      <div className="product-detail-container">
        <p>Product not found</p>
        <button onClick={() => onNavigate('products')}>Back to Products</button>
      </div>
    );
  }

  const sizes = [
    { size: '250ml', price: product.price },
    { size: '500ml', price: product.price + 50 },
    { size: '1L', price: product.price + 100 }
  ];

  const selectedSizeObj = sizes.find(s => s.size === selectedSize);
  const totalPrice = selectedSizeObj.price * quantity;

  const handleAddToCart = () => {
    const cartProduct = { ...product, quantity, size: selectedSize };
    addToCart(cartProduct);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => onNavigate('cart'), 500);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="product-detail-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => onNavigate('products')}>
        ← Back to Products
      </button>

      {/* Main Product Section */}
      <div className="product-detail-main">
        {/* Product Image */}
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          <div className="stock-badge">
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-detail-info">
          {/* Header */}
          <div className="detail-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating">
              <span className="stars">★★★★☆</span>
              <span className="review-count">(1,245 reviews)</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="price-section">
            <div className="price-display">
              <span className="current-price">₹{selectedSizeObj.price.toFixed(2)}</span>
              <span className="original-price">₹{(selectedSizeObj.price * 1.2).toFixed(2)}</span>
              <span className="discount">20% OFF</span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="seller-section">
            <p><strong>Seller:</strong> {product.seller}</p>
            <p><strong>Authenticity:</strong> <span className="verified">✓ Verified & Genuine</span></p>
          </div>

          {/* Size Selection */}
          <div className="size-section">
            <h3>Select Size:</h3>
            <div className="size-options">
              {sizes.map(item => (
                <button
                  key={item.size}
                  className={`size-btn ${selectedSize === item.size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(item.size)}
                >
                  <span className="size-label">{item.size}</span>
                  <span className="size-price">₹{item.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Section */}
          <div className="quantity-section">
            <h3>Quantity:</h3>
            <div className="quantity-control">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="qty-info">Max 10 units per order</p>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-row">
              <span>Product Price:</span>
              <span>₹{(selectedSizeObj.price * quantity).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charge:</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total Price:</span>
              <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn-add-cart" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              🛒 Add to Cart
            </button>
            <button 
              className="btn-buy-now" 
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Notification */}
          {showNotification && (
            <div className="notification-popup">
              ✓ Added to cart successfully!
            </div>
          )}

          {/* Product Features */}
          <div className="features-section">
            <h3>Why Choose This Product?</h3>
            <ul className="features-list">
              <li>✓ 100% Authentic & Original</li>
              <li>✓ Free Delivery on Orders Above ₹500</li>
              <li>✓ 7-Day Money Back Guarantee</li>
              <li>✓ Express Delivery Available</li>
              <li>✓ Secure Payment Options</li>
              <li>✓ Customer Support 24/7</li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="specifications">
            <h3>Product Details</h3>
            <table className="specs-table">
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>Coca-Cola</td>
                </tr>
                <tr>
                  <td>Product Type</td>
                  <td>Carbonated Soft Drink</td>
                </tr>
                <tr>
                  <td>Flavor</td>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <td>Availability</td>
                  <td>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                </tr>
                <tr>
                  <td>Warranty</td>
                  <td>Quality Guarantee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products-section">
        <h2>Related Products You Might Like</h2>
        <div className="related-products-grid">
          {relatedProducts.map(relProduct => (
            <div 
              key={relProduct.id} 
              className="related-product-card"
              onClick={() => onNavigate('product', relProduct.id)}
            >
              <div className="rel-img-wrapper">
                <img src={relProduct.image} alt={relProduct.name} />
              </div>
              <h4>{relProduct.name}</h4>
              <p className="rel-price">₹{relProduct.price.toFixed(2)}</p>
              <button className="rel-view-btn">View Details →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="badge">
          <span className="badge-icon">🔒</span>
          <span>Secure Checkout</span>
        </div>
        <div className="badge">
          <span className="badge-icon">🚚</span>
          <span>Fast Delivery</span>
        </div>
        <div className="badge">
          <span className="badge-icon">💯</span>
          <span>100% Authentic</span>
        </div>
        <div className="badge">
          <span className="badge-icon">↩️</span>
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
