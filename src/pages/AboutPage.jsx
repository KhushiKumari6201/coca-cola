import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="about-hero-text">
          <h1 className="about-title">The Coca-Cola Story</h1>
          <p className="about-subtitle">Refreshing the world, one story at a time. Discover the magic behind the world's most iconic beverage.</p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-grid">
          <div className="about-text-card glass-panel">
            <h2>Our Heritage</h2>
            <p>
              Born in 1886 in Atlanta, Georgia, by Dr. John S. Pemberton, Coca‑Cola was first offered as a fountain beverage at Jacob's Pharmacy by mixing Coca‑Cola syrup with carbonated water. Today, Coca‑Cola is a total beverage company, offering over 500 brands in more than 200 countries and territories.
            </p>
          </div>
          <div className="about-image-card">
            <img src="/images/i5.png" alt="Coca Cola Heritage" className="floating-img" />
          </div>
        </div>

        <div className="about-grid reverse">
          <div className="about-image-card">
            <img src="/images/i6.png" alt="Sustainability" className="floating-img-slow" />
          </div>
          <div className="about-text-card glass-panel">
            <h2>Our Purpose</h2>
            <p>
              Our vision is to craft the brands and choice of drinks that people love, to refresh them in body & spirit. And done in ways that create a more sustainable business and better shared future that makes a difference in people's lives, communities and our planet.
            </p>
            <ul className="purpose-list">
              <li>Loved Brands</li>
              <li>Done Sustainably</li>
              <li>For a Better Shared Future</li>
            </ul>
          </div>
        </div>

        <div className="stats-section glass-panel">
          <div className="stat-item">
            <h3>1886</h3>
            <p>Year Founded</p>
          </div>
          <div className="stat-item">
            <h3>200+</h3>
            <p>Countries Served</p>
          </div>
          <div className="stat-item">
            <h3>1.9B</h3>
            <p>Servings Daily</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
