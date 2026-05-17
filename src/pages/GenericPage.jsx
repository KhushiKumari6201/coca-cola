import React from 'react';
import './Pages.css';

const GenericPage = ({ title, description }) => {
  return (
    <div className="page-container generic-container">
      <div className="glass-panel text-center">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle" style={{marginBottom: 0}}>{description}</p>
        <div style={{marginTop: "40px"}}>
          <img src="/images/logo.png" alt="Coca-Cola" style={{height: "100px", opacity: 0.5}} />
        </div>
      </div>
    </div>
  );
}

export default GenericPage;
