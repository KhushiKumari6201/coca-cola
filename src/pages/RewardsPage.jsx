import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RewardsPage.css';
import QRScannerModal from '../components/QRScannerModal';
import QRCodeDisplay from '../components/QRCodeDisplay';

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
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(750);
  const [redeemedReward, setRedeemedReward] = useState(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [featuredRedeemedIds, setFeaturedRedeemedIds] = useState([]);
  const [featuredToast, setFeaturedToast] = useState(null);
  const [scanState, setScanState] = useState('idle');
  const [scanCount, setScanCount] = useState(12);
  const [scanHistory, setScanHistory] = useState([
    { id: 1, product: 'Classic Coke', pts: 50, time: '2 hrs ago' },
    { id: 2, product: 'Lime Edition', pts: 75, time: 'Yesterday' },
  ]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showQRDisplay, setShowQRDisplay] = useState(false);

  const handleRealScanSuccess = (data, pts) => {
    setScanCount(prev => prev + 1);
    setRewardPoints(prev => prev + pts);
    setScanHistory(prev => [{ id: Date.now(), product: data.length > 20 ? 'QR Product' : data, pts, time: 'Just now' }, ...prev.slice(0, 2)]);
    setFeaturedToast(`+${pts} pts earned from scan! 🎯`);
    setTimeout(() => { setShowQRScanner(false); setFeaturedToast(null); }, 3000);
  };

  const FEATURED = [
    { id: 'f1', img: '/images/i1.png', icon: '🎵', title: 'Concert Tickets', desc: 'VIP Access to Summer Festivals', cost: 5000, tag: 'Premium' },
    { id: 'f2', img: '/images/i2.png', icon: '👕', title: 'Limited Edition Merch', desc: 'Exclusive Coca-Cola Apparel', cost: 2500, tag: 'Popular' },
    { id: 'f3', img: '/images/i3.png', icon: '🖥️', title: 'Digital Downloads', desc: 'Wallpapers, Music, and more', cost: 500, tag: 'Easy Redeem' },
    { id: 'f4', img: '/images/i1.png', icon: '💰', title: 'Cashback ₹100', desc: 'Direct wallet credit', cost: 800, tag: 'Cashback' },
    { id: 'f5', img: '/images/i2.png', icon: '🥤', title: 'Free 6-Pack', desc: 'Any Coca-Cola variety', cost: 300, tag: 'Drinks' },
    { id: 'f6', img: '/images/i3.png', icon: '🎁', title: 'Mystery Box', desc: 'Surprise exclusive goodies', cost: 1200, tag: 'New' },
  ];

  const handleFeaturedRedeem = (item) => {
    if (rewardPoints < item.cost || featuredRedeemedIds.includes(item.id)) return;
    setRewardPoints(prev => prev - item.cost);
    setFeaturedRedeemedIds(prev => [...prev, item.id]);
    setFeaturedToast(`✅ ${item.title} redeemed! −${item.cost} pts`);
    setTimeout(() => setFeaturedToast(null), 3000);
  };

  const REWARDS = [
    { id: 1, icon: '🥤', title: 'Free Drink', desc: 'Any Coca-Cola product', cost: 200 },
    { id: 2, icon: '🎟️', title: 'Discount Coupon', desc: '20% off next order', cost: 350 },
    { id: 3, icon: '👕', title: 'Merch Item', desc: 'Exclusive Coca-Cola apparel', cost: 500 },
    { id: 4, icon: '🎵', title: 'VIP Experience', desc: 'Concert or festival access', cost: 800 },
    { id: 5, icon: '💰', title: 'Cashback ₹50', desc: 'Direct wallet cashback', cost: 400 },
    { id: 6, icon: '🎁', title: 'Mystery Box', desc: 'Surprise exclusive gift', cost: 600 },
  ];

  const handleRedeemReward = (reward) => {
    if (rewardPoints < reward.cost) return;
    setRedeemedReward(reward);
    setRedeemSuccess(true);
    setRewardPoints(prev => prev - reward.cost);
    setTimeout(() => { setRedeemSuccess(false); setShowRedeemModal(false); setRedeemedReward(null); }, 2500);
  };


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
                {/* Scanner preview card */}
                <div className="scanner-preview-card" onClick={() => setShowQRScanner(true)}>
                  <div className="scanner-frame-pro idle">
                    <div className="corner tl"/><div className="corner tr"/>
                    <div className="corner bl"/><div className="corner br"/>
                    <div className="scanner-laser"/>
                    <svg viewBox="0 0 24 24" className="qr-code"><path fill="currentColor" d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h-4v2h2v2h-2v2h2v-2h2v2h2v-4h-2zm-2 2v2h-2v-2z"></path></svg>
                    <p className="scan-tap-hint">Tap to open camera</p>
                  </div>
                  <p className="scan-instruction">📷 Click to open live camera scanner</p>
                </div>
                {/* Stats */}
                <div className="scan-stats">
                  <div className="stat"><span>Total Scans</span><strong>{scanCount}</strong></div>
                  <div className="stat"><span>Points</span><strong className="text-red">{rewardPoints}</strong></div>
                </div>
                {/* History */}
                <div className="scan-history">
                  <p className="scan-history-title">Recent Scans</p>
                  {scanHistory.map(h => (
                    <div key={h.id} className="scan-history-row">
                      <span className="scan-h-product">{h.product}</span>
                      <span className="scan-h-time">{h.time}</span>
                      <span className="scan-h-pts">+{h.pts} pts</span>
                    </div>
                  ))}
                </div>
                <button className="widget-primary-btn scan-now-btn" onClick={() => setShowQRDisplay(true)}>
                  📲 Show My QR Code
                </button>
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
                    <span className="pts-live">{rewardPoints} / 1000 pts</span>
                  </div>
                  <div className="progress-bar-bg">
                    <motion.div
                      initial={{width:0}}
                      whileInView={{width: `${Math.min((rewardPoints/1000)*100,100)}%`}}
                      transition={{duration:1}}
                      className="progress-bar-fill"
                    />
                  </div>
                  <p className="progress-hint">{rewardPoints >= 1000 ? '🎉 VIP Unlocked!' : `${1000 - rewardPoints} pts to VIP`}</p>
                </div>
                <div className="badges-section">
                  <div className="badge-item earned" title="First Scan">⭐</div>
                  <div className="badge-item earned" title="First Purchase">🎁</div>
                  <div className={`badge-item ${rewardPoints >= 500 ? 'earned' : 'locked'}`} title="500 Points">🏆</div>
                </div>
                <div className="earn-quick-rewards">
                  <div className="quick-reward-pill">🥤 Free Drink — 200 pts</div>
                  <div className="quick-reward-pill">🎟️ Coupon — 350 pts</div>
                </div>
                <button className="widget-primary-btn outline" onClick={() => setShowRedeemModal(true)}>
                  🎁 Redeem Rewards
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="featured-rewards">
        <h2>Featured Rewards</h2>
        <div className="featured-pts-bar">
          <span>🔥 Your Points:</span>
          <strong className="text-red">{rewardPoints} pts</strong>
          <button className="featured-earn-more" onClick={() => setShowRedeemModal(true)}>+ Earn More</button>
        </div>
        <div className="rewards-grid">
          {FEATURED.map(item => {
            const canAfford = rewardPoints >= item.cost;
            const isRedeemed = featuredRedeemedIds.includes(item.id);
            return (
              <motion.div key={item.id} whileHover={{y:-6, boxShadow:'0 20px 40px rgba(255,0,0,0.15)'}} className={`reward-item ${isRedeemed ? 'reward-redeemed' : ''}`}>
                <div className="reward-tag">{item.tag}</div>
                <div className="reward-image">
                  <img src={item.img} alt={item.title} />
                  {isRedeemed && <div className="reward-claimed-overlay">✅ Claimed</div>}
                </div>
                <div className="reward-item-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="reward-cost-row">
                  <span className={`reward-pts-cost ${!canAfford && !isRedeemed ? 'unaffordable' : ''}`}>
                    {item.cost.toLocaleString()} pts
                  </span>
                  {!isRedeemed && !canAfford && (
                    <span className="reward-pts-needed">Need {(item.cost - rewardPoints).toLocaleString()} more</span>
                  )}
                </div>
                <button
                  className={`redeem-btn featured-redeem-btn ${isRedeemed ? 'claimed' : !canAfford ? 'locked' : ''}`}
                  onClick={() => handleFeaturedRedeem(item)}
                  disabled={isRedeemed || !canAfford}
                >
                  {isRedeemed ? '✅ Claimed!' : canAfford ? '🎁 Redeem Now' : '🔒 Not Enough Points'}
                </button>
              </motion.div>
            );
          })}
        </div>
        {featuredToast && (
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="featured-toast">
            {featuredToast}
          </motion.div>
        )}
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

      {/* Redeem Rewards Modal */}
      {showRedeemModal && (
        <div className="rewards-modal-overlay" onClick={() => !redeemSuccess && setShowRedeemModal(false)}>
          <motion.div initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} className="rewards-modal-content redeem-modal" onClick={e=>e.stopPropagation()}>
            {!redeemSuccess ? (
              <>
                <button className="close-modal" onClick={()=>setShowRedeemModal(false)}>✕</button>
                <div className="modal-header">
                  <div className="order-icon">🎁</div>
                  <h2>Redeem Rewards</h2>
                  <div className="redeem-points-display">
                    <span>Your Balance:</span>
                    <strong className="text-red">{rewardPoints} pts</strong>
                  </div>
                </div>
                <div className="redeem-grid">
                  {REWARDS.map(reward => {
                    const canAfford = rewardPoints >= reward.cost;
                    return (
                      <motion.div key={reward.id} whileHover={canAfford?{y:-4}:{}} className={`redeem-card ${!canAfford?'locked-reward':''}`}>
                        <div className="redeem-icon">{reward.icon}</div>
                        <h4>{reward.title}</h4>
                        <p>{reward.desc}</p>
                        <div className="redeem-cost">{reward.cost} pts</div>
                        <button
                          className={`redeem-action-btn ${canAfford?'':'disabled'}`}
                          onClick={()=>canAfford&&handleRedeemReward(reward)}
                        >
                          {canAfford ? 'Redeem Now' : `Need ${reward.cost - rewardPoints} more pts`}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} className="order-success">
                <div className="success-icon">{redeemedReward?.icon}</div>
                <h2>{redeemedReward?.title} Redeemed!</h2>
                <p>{redeemedReward?.desc} has been added to your account.</p>
                <div className="pts-deducted">−{redeemedReward?.cost} pts · Balance: {rewardPoints} pts</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* Real Camera QR Scanner */}
      <AnimatePresence>
        {showQRScanner && (
          <QRScannerModal
            onClose={() => setShowQRScanner(false)}
            onScanSuccess={handleRealScanSuccess}
          />
        )}
      </AnimatePresence>

      {/* QR Code Display — show this QR to another device to scan */}
      <AnimatePresence>
        {showQRDisplay && (
          <QRCodeDisplay
            onClose={() => setShowQRDisplay(false)}
            onScanEarned={(product, pts) => {
              setScanCount(prev => prev + 1);
              setRewardPoints(prev => prev + pts);
              setScanHistory(prev => [{ id: Date.now(), product, pts, time: 'Just now' }, ...prev.slice(0, 2)]);
              setFeaturedToast(`+${pts} pts earned! 🎯`);
              setTimeout(() => setFeaturedToast(null), 3000);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewardsPage;
