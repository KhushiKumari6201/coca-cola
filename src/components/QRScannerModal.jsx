import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import './QRScannerModal.css';

const QRScannerModal = ({ onClose, onScanSuccess }) => {
  const scannerRef = useRef(null);
  const [status, setStatus] = useState('starting'); // starting | active | success | error
  const [scannedData, setScannedData] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [torchOn, setTorchOn] = useState(false);
  const html5QrcodeRef = useRef(null);

  const SCANNER_ID = 'qr-scanner-region';

  const startScanner = (cameraId) => {
    const html5Qrcode = new Html5Qrcode(SCANNER_ID);
    html5QrcodeRef.current = html5Qrcode;

    const config = {
      fps: 15,
      qrbox: { width: 220, height: 220 },
      aspectRatio: 1.0,
      showTorchButtonIfSupported: false,
    };

    html5Qrcode.start(
      cameraId ? { deviceId: { exact: cameraId } } : { facingMode: 'environment' },
      config,
      (decodedText) => {
        html5Qrcode.stop().catch(() => {});
        setScannedData(decodedText);
        setStatus('success');
        const pts = [50, 75, 100, 150][Math.floor(Math.random() * 4)];
        onScanSuccess(decodedText, pts);
      },
      () => {}
    ).then(() => setStatus('active')).catch(() => setStatus('error'));
  };

  useEffect(() => {
    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        setCameras(devices);
        const backCam = devices.find(d => /back|rear|environment/i.test(d.label)) || devices[devices.length - 1];
        setSelectedCamera(backCam.id);
        startScanner(backCam.id);
      } else {
        setStatus('error');
      }
    }).catch(() => setStatus('error'));

    return () => {
      html5QrcodeRef.current?.stop().catch(() => {});
    };
  }, []);

  const switchCamera = (id) => {
    html5QrcodeRef.current?.stop().catch(() => {});
    setSelectedCamera(id);
    setStatus('starting');
    setTimeout(() => startScanner(id), 300);
  };

  return (
    <div className="qr-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="qr-modal"
      >
        {/* Header */}
        <div className="qr-header">
          <div className="qr-logo">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#f00" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10"/></svg>
            <span>QR Scanner</span>
          </div>
          <button className="qr-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Camera viewport */}
        <div className="qr-viewport-wrap">
          <div id={SCANNER_ID} className="qr-viewport" />

          {/* Overlay UI on top of camera */}
          {status === 'active' && (
            <div className="qr-viewfinder">
              <div className="vf-corner tl"/><div className="vf-corner tr"/>
              <div className="vf-corner bl"/><div className="vf-corner br"/>
              <div className="vf-laser"/>
              <div className="vf-hint">Align QR code within frame</div>
            </div>
          )}
          {status === 'starting' && (
            <div className="qr-status-overlay">
              <div className="qr-spinner"/>
              <p>Starting camera...</p>
            </div>
          )}
          {status === 'success' && (
            <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} className="qr-success-overlay">
              <div className="qr-success-check">✓</div>
              <h3>QR Code Detected!</h3>
              <p className="qr-data-preview">{scannedData?.substring(0, 40)}{scannedData?.length > 40 ? '...' : ''}</p>
            </motion.div>
          )}
          {status === 'error' && (
            <div className="qr-status-overlay error">
              <div className="qr-error-icon">📵</div>
              <h3>Camera Access Denied</h3>
              <p>Please allow camera permission in your browser settings and reload.</p>
            </div>
          )}
        </div>

        {/* Camera switcher */}
        {cameras.length > 1 && status === 'active' && (
          <div className="qr-camera-row">
            {cameras.map(cam => (
              <button
                key={cam.id}
                className={`qr-cam-btn ${selectedCamera === cam.id ? 'active' : ''}`}
                onClick={() => switchCamera(cam.id)}
              >
                {/back|rear|environment/i.test(cam.label) ? '📷 Back' : '🤳 Front'}
              </button>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="qr-instructions">
          <div className="qr-step"><span>1</span>Hold product QR code up to camera</div>
          <div className="qr-step"><span>2</span>Keep steady — auto-detects instantly</div>
          <div className="qr-step"><span>3</span>Earn points automatically on scan</div>
        </div>

        {status === 'active' && (
          <p className="qr-live-badge">🔴 LIVE CAMERA</p>
        )}
      </motion.div>
    </div>
  );
};

export default QRScannerModal;
