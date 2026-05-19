import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './MerchPage.css';

const MerchPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useContext(AppContext);

  const merchItems = [
    { id: 'm1', name: "Coca-Cola Tee", price: 1299, image: "/images/i1.png", category: "Best Sellers" },
    { id: 'm2', name: "Coca-Cola Cap", price: 899, image: "/images/i2.png", category: "Best Sellers" },
    { id: 'm3', name: "Coca-Cola Neon Sign", price: 4599, image: "/images/i3.png", category: "Limited Edition" },
    { id: 'm4', name: "Coca-Cola Glass Set", price: 1499, image: "/images/i4.png", category: "Best Sellers" },
    { id: 'm5', name: "Coca-Cola Cooler", price: 8999, image: "/images/i5.png", category: "Best Sellers" },
    { id: 'm6', name: "Coca-Cola Hoodie", price: 2499, image: "/images/i6.png", category: "New Arrivals" },
    { id: 'm7', name: "Coca-Cola Tee", price: 1899, image: "/images/i1.png", category: "Zero Sugar" },
    { id: 'm8', name: "Coca-Cola Cap", price: 999, image: "/images/i2.png", category: "Energy Drinks" },
    { id: 'm9', name: "Coca-Cola Neon Sign", price: 699, image: "/images/i3.png", category: "Fruit Flavors" },
    { id: 'm10', name: "Coca-Cola Glass Set", price: 5999, image: "/images/i4.png", category: "Limited Edition" },
    { id: 'm11', name: "Coca-Cola Cooler", price: 3499, image: "/images/i5.png", category: "Soft Drinks" }
  ];

  const categories = ['All', 'Soft Drinks', 'Zero Sugar', 'Energy Drinks', 'Fruit Flavors', 'Limited Edition', 'Best Sellers', 'New Arrivals'];

  const filteredItems = activeCategory === 'All' 
    ? merchItems 
    : merchItems.filter(item => item.category === activeCategory);

  return (
    <div className="merch-page">
      <div className="merch-hero">
        <div className="merch-hero-content">
          <h1>Official Merchandise</h1>
          <p>Wear the feeling. Shop exclusive Coca-Cola gear.</p>
        </div>
      </div>

      <div className="merch-container">
        <aside className="merch-sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map(category => (
              <li 
                key={category} 
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="merch-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="merch-card">
              <div className="merch-img-wrapper">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="merch-info">
                <span className="merch-category">{item.category}</span>
                <h3>{item.name}</h3>
                <div className="merch-bottom">
                  <span className="merch-price">₹{item.price}</span>
                  <button className="add-cart-btn-sm" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default MerchPage;
