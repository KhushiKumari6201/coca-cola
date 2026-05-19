import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import './QRCodeDisplay.css';

const PRODUCTS = [
  { name: 'Classic Coke', pts: 100, code: 'COKE-CLASSIC-2024' },
  { name: 'Lime Edition', pts: 75, code: 'COKE-LIME-2024' },
  { name: 'Gold Edition', pts: 150, code: 'COKE-GOLD-2024' },
  { name: 'Zero Sugar', pts: 50, code: 'COKE-ZERO-2024' },
  { name: 'Meal Deal', pts: 120, code: 'COKE-MEAL-2024' },
];

const QRCodeDisplay = ({ onClose, onScanEarned }) => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [scanned, setScanned] = useState(false);
  const [timer, setTimer] = useState(60); // 60s QR validity
  const [refreshKey, setRefreshKey] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (scanned) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Refresh QR code
          setRefreshKey(k => k + 1);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [scanned]);

  // Simulate: when another device scans — user clicks "Simulate Scan" for demo
  const handleSimulateScan = () => {
    setScanned(true);
    onScanEarned(selectedProduct.name, selectedProduct.pts);
    setTimeout(() => { setScanned(false); onClose(); }, 3000);
  };

  const qrValue = `${window.location.origin}/scan?code=${selectedProduct.code}&pts=${selectedProduct.pts}&key=${refreshKey}`;

  return (
    <div className="qrd-overlay" onClick={e => e.target === e.currentTarget && !scanned && onClose()}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="qrd-modal"
      >
        {/* Header */}
        <div className="qrd-header">
          <div className="qrd-logo">
            <span className="qrd-logo-icon">🥤</span>
            <span>Coca-Cola Rewards QR</span>
          </div>
          {!scanned && <button className="qrd-close" onClick={onClose}>✕</button>}
        </div>

        <AnimatePresence mode="wait">
          {!scanned ? (
            <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="qrd-body">
              {/* Product selector */}
              <div className="qrd-products">
                {PRODUCTS.map(p => (
                  <button
                    key={p.code}
                    className={`qrd-product-btn ${selectedProduct.code === p.code ? 'active' : ''}`}
                    onClick={() => { setSelectedProduct(p); setRefreshKey(k => k + 1); setTimer(60); }}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* QR Code */}
              <div className="qrd-qr-wrap">
                <div className="qrd-corner qrd-tl"/><div className="qrd-corner qrd-tr"/>
                <div className="qrd-corner qrd-bl"/><div className="qrd-corner qrd-br"/>
                <div className="qrd-qr-inner">
                  <QRCodeSVG
                    value={qrValue}
                    size={200}
                    bgColor="transparent"
                    fgColor="#ffffff"
                    level="H"
                    includeMargin={false}
                  />
                </div>
                {/* Coca-Cola center logo */}
                <div className="qrd-center-logo">🥤</div>
              </div>

              {/* Product info */}
              <div className="qrd-product-info">
                <h3>{selectedProduct.name}</h3>
                <div className="qrd-pts-badge">+{selectedProduct.pts} pts on scan</div>
              </div>

              {/* Timer */}
              <div className="qrd-timer-row">
                <div className="qrd-timer-bar">
                  <motion.div
                    className="qrd-timer-fill"
                    animate={{ width: `${(timer / 60) * 100}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </div>
                <span className="qrd-timer-text">Refreshes in {timer}s</span>
              </div>

              {/* Instructions */}
              <div className="qrd-instructions">
                <div className="qrd-inst-row">
                  <span className="qrd-inst-num">1</span>
                  <span>Open camera on your phone or any QR scanner app</span>
                </div>
                <div className="qrd-inst-row">
                  <span className="qrd-inst-num">2</span>
                  <span>Point it at this QR code on screen</span>
                </div>
                <div className="qrd-inst-row">
                  <span className="qrd-inst-num">3</span>
                  <span>Points are credited to your account instantly</span>
                </div>
              </div>

              {/* Demo simulate button */}
              <button className="qrd-simulate-btn" onClick={handleSimulateScan}>
                📱 Simulate Scan (Demo)
              </button>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="qrd-success">
              <div className="qrd-success-icon">✅</div>
              <h2>Scanned Successfully!</h2>
              <p className="qrd-success-product">{selectedProduct.name}</p>
              <div className="qrd-success-pts">+{selectedProduct.pts} pts added!</div>
              <p className="qrd-success-note">Closing in a moment...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QRCodeDisplay;
