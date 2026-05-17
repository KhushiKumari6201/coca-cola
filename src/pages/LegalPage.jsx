import React from 'react';
import './LegalPage.css';

const LegalPage = ({ title, lastUpdated, sections }) => {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <h1>{title}</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="legal-content glass-panel">
        {sections.map((section, index) => (
          <div key={index} className="legal-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;
