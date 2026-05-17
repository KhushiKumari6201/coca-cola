import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Pages.css';

const ProductsPage = () => {
  const { products, addToCart } = useContext(AppContext);
  const [filter, setFilter] = React.useState('All');

  const categories = ['All', 'Classic', 'Fruity', 'Zero Sugar'];

  // Mock categorizing based on name
  const filteredProducts = products.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Classic' && p.name.includes('Cream')) return true;
    if (filter === 'Fruity' && (p.name.includes('Apple') || p.name.includes('Mango') || p.name.includes('Raspberry') || p.name.includes('Lime') || p.name.includes('Cherry'))) return true;
    if (filter === 'Zero Sugar' && p.name.includes('Zero')) return true;
    return false;
  });

  return (
    <div className="page-container" style={{ padding: 0 }}>
      {/* Banner Section */}
      <div className="products-banner">
        <div className="banner-content">
          <h1>Exclusive Flavors</h1>
          <p>Discover our refreshing range of premium Coca-Cola creations.</p>
        </div>
      </div>

      <div className="products-main">
        {/* Filter Section */}
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="filter-pills">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-pill ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price.toFixed(2)}</p>
                <p className="seller">Seller: {product.seller}</p>
                <button className="add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          )) : (
            <p className="no-products">No products found in this category.</p>
          )}
        </div>
      </div>

      {/* Promo Section at Bottom */}
      <div className="promo-section glass-panel">
        <div className="promo-text">
          <h2>Special Bulk Offer!</h2>
          <p>Buy any 3 imported flavors and get a classic Coca-Cola glass absolutely free. Limited time only!</p>
          <button className="action-btn save">Shop the Offer</button>
        </div>
        <img src="/images/i1.png" alt="Promo" className="promo-img" />
      </div>
    </div>
  );
}

export default ProductsPage;
