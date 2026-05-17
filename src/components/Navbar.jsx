import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import './Navbar.css'

const Navbar = ({ onNavigate, currentPage }) => {
  const { cart } = useContext(AppContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getLinkClass = (page) => {
    return `nav-link ${currentPage === page ? 'active' : ''}`;
  }

  return (
    <nav className="navbar">
      <div className="nav-links left-links">
        <a href="#" className={getLinkClass('home')} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
        <a href="#" className={getLinkClass('products')} onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>Products</a>
        <a href="#" className={getLinkClass('about')} onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About</a>
      </div>

      <div className="nav-logo" onClick={() => onNavigate('home')}>
        <img src="/images/logo.png" alt="Coca-Cola Logo" />
      </div>

      <div className="nav-links right-links">
        <a href="#" className={getLinkClass('rewards')} onClick={(e) => { e.preventDefault(); onNavigate('rewards'); }}>Rewards</a>
        <a href="#" className={getLinkClass('merch')} onClick={(e) => { e.preventDefault(); onNavigate('merch'); }}>Merch</a>
        <a href="#" className={getLinkClass('contact')} onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact</a>
        
        {/* Dashboards & Cart */}
        <div className="dropdown">
          <a href="#" className="nav-link dropdown-toggle" onClick={(e) => e.preventDefault()}>Portals ▾</a>
          <div className="dropdown-menu">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('admin'); }}>Admin</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('seller'); }}>Seller</a>
          </div>
        </div>
        
        <a href="#" className={getLinkClass('cart')} onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}>
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </a>
      </div>
    </nav>
  )
}

export default Navbar