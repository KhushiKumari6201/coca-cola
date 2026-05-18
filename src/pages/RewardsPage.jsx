import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RewardsPage.css';

const PRODUCTS = {
  Drinks: [
    { name: 'Classic Coke', img: '/images/i1.png', badge: '-20%', badgeColor: '#f00' },
    { name: 'Lime Coke', img: '/images/i2.png', badge: null },
    { name: 'Cherry Coke', img: '/images/i3.png', badge: 'New', badgeColor: '#333' },
  ],
  Combos: [
    { name: 'Meal Deal', img: '/images/i3.png', badge: 'Hot', badgeColor: '#ff6600' },
    { name: 'Party Pack', img: '/images/i1.png', badge: 'Best', badgeColor: '#9b59b6' },
    { name: 'Family Bundle', img: '/images/i2.png', badge: '-15%', badgeColor: '#f00' },
  ],
  Limited: [
    { name: 'Gold Edition', img: '/images/i2.png', badge: 'Rare', badgeColor: '#d4af37', style: {filter:'sepia(1) hue-rotate(-30deg) saturate(3)'} },
    { name: 'Zero Sugar', img: '/images/i3.png', badge: 'New', badgeColor: '#222' },
    { name: 'Winter Special', img: '/images/i1.png', badge: 'Ltd', badgeColor: '#1a6fc4' },
  ],
};

const RewardsPage = ({ onNavigate }) => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Drinks');
  const [cartQty, setCartQty] = useState({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleAddToCart = (itemName) => {
    setCartQty(prev => ({...prev, [itemName]: (prev[itemName] || 0) + 1}));
  };

  const handleRemoveFromCart = (itemName) => {
    setCartQty(prev => {
      const current = prev[itemName] || 0;
      if (current <= 1) {
        const updated = {...prev};
        delete updated[itemName];
        return updated;
      }
      return {...prev, [itemName]: current - 1};
    });
  };

  const getTotalCartItems = () => Object.values(cartQty).reduce((a, b) => a + b, 0);

  // Returns all items in current category with current qty (default 0)
  const getCategoryItems = () => (PRODUCTS[activeCategory] || []).map(p => ({
    ...p, qty: cartQty[p.name] || 0
  }));

  const handleShopNow = () => {
    setOrderPlaced(false);
    setShowOrderModal(true);
  };

  const handleConfirmOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setShowOrderModal(false);
      setCartQty({});
      setOrderPlaced(false);
    }, 2500);
  };
  return (
    <div className="rewards-page">
      <div className="rewards-hero">
        <div className="rewards-hero-content">
          <h1>{isLoggedIn ? 'Welcome Back!' : 'Coca-Cola Rewards'}</h1>
          <p>{isLoggedIn ? 'You currently have 500 bonus points ready to be redeemed.' : 'Sip, Scan, and Score. Turn your refreshing moments into exclusive experiences.'}</p>
          
          {isLoggedIn ? (
            <div className="logged-in-actions">
              <div className="points-badge">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>500 Points</span>
              </div>
              <div className="action-buttons">
                <button className="join-btn" onClick={() => alert("Scanner opening...")}>
                  Scan Code
                </button>
                <button className="redeem-btn logout-btn" onClick={() => setIsLoggedIn(false)}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <button className="join-btn" onClick={() => { setIsLoginMode(false); setIsJoinModalOpen(true); }}>
              Join Now
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '10px'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="rewards-steps">
        <h2>How It Works</h2>
        <p className="steps-subtitle">Start earning rewards in three simple steps.</p>
        <div className="steps-container">
          <div className="connecting-line"></div>
          <div className="steps-grid">
            {/* Card 1 - BUY */}
            <motion.div whileHover={{ y: -15 }} className="step-card">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              </div>
              <div className="step-number">1</div>
              <h3>Buy</h3>
              <p>Purchase any participating Coca-Cola product and begin your rewards journey.</p>
              
              <div className="mini-widget buy-widget">
                <div className="widget-categories">
                  {Object.keys(PRODUCTS).map(cat => (
                    <motion.span key={cat} onClick={() => setActiveCategory(cat)} whileHover={{ scale: 1.05 }} className={activeCategory === cat ? 'active' : ''}>
                      {cat === 'Drinks' ? '🥤' : cat === 'Combos' ? '🍔' : '✨'} {cat}
                    </motion.span>
                  ))}
                </div>
                <div className="widget-products">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeCategory} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}} style={{display:'flex',gap:'12px',width:'100%'}}>
                      {PRODUCTS[activeCategory].slice(0,2).map(product => (
                        <motion.div key={product.name} whileHover={{y:-5}} className="mini-product">
                          {product.badge && <span className="badge" style={{background: product.badgeColor || '#f00'}}>{product.badge}</span>}
                          <img src={product.img} alt={product.name} style={product.style || {}} />
                          <div className="mini-info">
                            <h4>{product.name.split(' ')[0]}</h4>
                            <div className="qty-control">
                              {cartQty[product.name] > 0 && <motion.button whileTap={{scale:0.85}} className="qty-btn minus" onClick={() => handleRemoveFromCart(product.name)}>−</motion.button>}
                              {cartQty[product.name] > 0 && <span className="qty-num">{cartQty[product.name]}</span>}
                              <motion.button whileTap={{scale:0.85}} className="qty-btn plus" onClick={() => handleAddToCart(product.name)}>+</motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {getTotalCartItems() > 0 && (
                  <div className="cart-summary">🛒 {getTotalCartItems()} item{getTotalCartItems() > 1 ? 's' : ''} in cart</div>
                )}
                <button className="widget-primary-btn shop-btn" onClick={handleShopNow}>Shop Now →</button>
              </div>
            </motion.div>

            {/* Card 2 - SCAN */}
            <motion.div whileHover={{ y: -15 }} className="step-card">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10"></rect></svg>
              </div>
              <div className="step-number">2</div>
              <h3>Scan</h3>
              <p>Scan the QR code on the product to collect reward points instantly.</p>

              <div className="mini-widget scan-widget">
                <div className="scanner-ui">
                  <div className="scanner-frame">
                    <div className="scanner-laser"></div>
                    <svg viewBox="0 0 24 24" className="qr-code"><path fill="currentColor" d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h-4v2h2v2h-2v2h2v-2h2v2h2v-4h-2zm-2 2v2h-2v-2z"></path></svg>
                  </div>
                </div>
                <div className="scan-stats">
                  <div className="stat"><span>Scanned</span><strong>12</strong></div>
                  <div className="stat"><span>Points</span><strong className="text-red">1200</strong></div>
                </div>
                <button className="widget-primary-btn" onClick={() => alert("Scanning...")}>Scan Now</button>
              </div>
            </motion.div>

            {/* Card 3 - EARN */}
            <motion.div whileHover={{ y: -15 }} className="step-card">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div className="step-number">3</div>
              <h3>Earn</h3>
              <p>Earn exciting rewards, discounts, cashback, and exclusive experiences.</p>

              <div className="mini-widget earn-widget">
                <div className="progress-section">
                  <div className="progress-text">
                    <span>VIP Status</span>
                    <span>750 / 1000 pts</span>
                  </div>
                  <div className="progress-bar-bg">
                    <motion.div initial={{width:0}} whileInView={{width: '75%'}} transition={{duration: 1}} className="progress-bar-fill"></motion.div>
                  </div>
                </div>
                <div className="badges-section">
                  <div className="badge-item earned"><span role="img" aria-label="star">⭐</span></div>
                  <div className="badge-item earned"><span role="img" aria-label="gift">🎁</span></div>
                  <div className="badge-item locked"><span role="img" aria-label="lock">🔒</span></div>
                </div>
                <button className="widget-primary-btn outline">Redeem Rewards</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="featured-rewards">
        <h2>Featured Rewards</h2>
        <div className="rewards-grid">
          <div className="reward-item">
            <div className="reward-image i1">
               <img src="/images/i1.png" alt="Reward 1" />
            </div>
            <h3>Concert Tickets</h3>
            <p>VIP Access to Summer Festivals</p>
            <button className="redeem-btn">Redeem 5000 pts</button>
          </div>
          <div className="reward-item">
            <div className="reward-image i2">
              <img src="/images/i2.png" alt="Reward 2" />
            </div>
            <h3>Limited Edition Merch</h3>
            <p>Exclusive Coca-Cola Apparel</p>
            <button className="redeem-btn">Redeem 2500 pts</button>
          </div>
          <div className="reward-item">
            <div className="reward-image i3">
              <img src="/images/i3.png" alt="Reward 3" />
            </div>
            <h3>Digital Downloads</h3>
            <p>Wallpapers, Music, and more</p>
            <button className="redeem-btn">Redeem 500 pts</button>
          </div>
        </div>
      </div>

      {isJoinModalOpen && (
        <div className="rewards-modal-overlay" onClick={() => setIsJoinModalOpen(false)}>
          <div className="rewards-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsJoinModalOpen(false)}>✕</button>
            <div className="modal-header">
              <h2>{isLoginMode ? 'Welcome Back!' : 'Join Coca-Cola Rewards'}</h2>
              <p>
                {isLoginMode 
                  ? 'Sign in to access your points and exclusive rewards.' 
                  : <>Sign up today and instantly receive <strong>500 bonus points</strong> to kickstart your journey!</>}
              </p>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setIsJoinModalOpen(false); }}>
              {!isLoginMode && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
              )}
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="join-btn" style={{width: '100%', marginTop: '10px'}}>
                {isLoginMode ? 'Login' : 'Create Account'}
              </button>

              <div className="modal-toggle">
                {isLoginMode ? (
                  <p>Don't have an account? <span onClick={() => setIsLoginMode(false)}>Sign up here</span></p>
                ) : (
                  <p>Already have an account? <span onClick={() => setIsLoginMode(true)}>Login</span></p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Modal — shows ALL items in current category */}
      {showOrderModal && (
        <div className="rewards-modal-overlay" onClick={() => !orderPlaced && setShowOrderModal(false)}>
          <motion.div initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} className="rewards-modal-content order-modal" onClick={e => e.stopPropagation()}>
            {!orderPlaced ? (
              <>
                <button className="close-modal" onClick={() => setShowOrderModal(false)}>✕</button>
                <div className="modal-header">
                  <div className="order-icon">🛒</div>
                  <h2>Shop — {activeCategory}</h2>
                  <p>All items in this category. Adjust quantities and confirm.</p>
                </div>
                <div className="order-items-list">
                  {getCategoryItems().map(item => (
                    <div key={item.name} className="order-item-row">
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <img src={item.img} alt={item.name} style={{height:'36px',filter: item.style?.filter || 'none'}} />
                        <div className="order-item-info">
                          <span className="order-item-name">{item.name}</span>
                          {item.badge && <span className="order-item-cat" style={{color: item.badgeColor || '#aaa'}}>{item.badge}</span>}
                        </div>
                      </div>
                      <div className="order-item-qty-row">
                        <button className="order-qty-btn" onClick={() => handleRemoveFromCart(item.name)} disabled={item.qty === 0}>−</button>
                        <span className="order-qty-num">{item.qty}</span>
                        <button className="order-qty-btn" onClick={() => handleAddToCart(item.name)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total-row">
                  <span>Total Items</span>
                  <strong>{getTotalCartItems()}</strong>
                </div>
                <button
                  className="join-btn"
                  style={{width:'100%',marginTop:'20px',opacity: getTotalCartItems()===0?0.5:1}}
                  onClick={getTotalCartItems()>0 ? handleConfirmOrder : undefined}
                >
                  {getTotalCartItems() > 0 ? '✅ Confirm Order' : 'Add at least 1 item'}
                </button>
              </>
            ) : (
              <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} className="order-success">
                <div className="success-icon">🎉</div>
                <h2>Order Placed!</h2>
                <p>Your Coca-Cola order has been confirmed. Enjoy your rewards!</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
