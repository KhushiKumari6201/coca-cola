import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Pages.css';

const SellerDashboard = () => {
  const { products, addProduct, removeProduct } = useContext(AppContext);
  const sellerName = "Coca-Cola Co."; 
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '/images/logo.png', seller: sellerName });

  const handleAdd = (e) => {
    e.preventDefault();
    if(newProduct.name && newProduct.price > 0) {
      addProduct({...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock)});
      setNewProduct({ name: '', price: '', stock: '', image: '/images/logo.png', seller: sellerName });
    }
  }

  const myProducts = products.filter(p => p.seller === sellerName);

  return (
    <div className="page-container seller-container">
      <h1 className="page-title">Seller Portal</h1>
      <p className="page-subtitle">List and manage your own products on the platform.</p>
      
      <div className="dashboard-grid">
        <div className="dashboard-card form-card glass-panel">
          <h2>Add New Product</h2>
          <form onSubmit={handleAdd} className="seller-form">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" placeholder="e.g. Vanilla Coke" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" placeholder="2.99" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required min="0.1" step="0.01"/>
            </div>
            <div className="form-group">
              <label>Initial Stock</label>
              <input type="number" placeholder="100" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} required min="1"/>
            </div>
            <button type="submit" className="action-btn submit">List Product</button>
          </form>
        </div>
        
        <div className="dashboard-card glass-panel">
          <h2>My Active Listings</h2>
          <ul className="listing-list">
            {myProducts.length === 0 ? <p>You have no products listed.</p> : myProducts.map(p => (
              <li key={p.id} className="listing-item">
                <div className="listing-info">
                  <strong>{p.name}</strong>
                  <span>₹{p.price.toFixed(2)} | Stock: {p.stock}</span>
                </div>
                <button onClick={() => removeProduct(p.id)} className="action-btn delete">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
