import React, { useState } from 'react';

const PhoneButton = () => {
  const phoneNumber = '0988888888';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>{`
        .phone-button-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
        }
        
        .phone-button {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          transition: all 0.3s ease;
          border: none;
          animation: pulse 2s infinite;
        }
        
        .phone-button:hover {
          transform: scale(1.15);
          box-shadow: 0 12px 35px rgba(37, 211, 102, 0.6);
        }
        
        .phone-button:active {
          transform: scale(1.05);
        }
        
        .phone-button.active {
          transform: rotate(45deg);
        }
        
        .phone-icon {
          width: 35px;
          height: 35px;
          fill: white;
          transition: transform 0.3s ease;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          50% {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4), 0 0 0 15px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        
        .menu-options {
          position: absolute;
          bottom: 85px;
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          transition: all 0.3s ease;
        }
        
        .menu-options.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 15px 20px;
          border-radius: 50px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          text-decoration: none;
          color: #333;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .menu-item:hover {
          transform: translateX(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        .menu-item.zalo {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
        }
        
        .menu-item.phone {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .menu-item-icon {
          width: 25px;
          height: 25px;
          fill: currentColor;
        }
        
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          display: none;
          z-index: 999;
        }
        
        .overlay.open {
          display: block;
        }
      `}</style>

      <div className="phone-button-container">
        <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
        
        <div className={`menu-options ${isMenuOpen ? 'open' : ''}`}>
          <a 
            href={`https://zalo.me/${phoneNumber}`}
            className="menu-item zalo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="menu-item-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.52 3.449A11.008 11.008 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.133.56 4.126 1.537 5.847l-1.01 3.001a.997.997 0 0 0 1.265 1.265l3-.999A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.017-1.116-5.775-2.954-7.888l-.526-.663zM12 22c-2.146 0-4.145-.678-5.781-1.827l-.414-.29-2.896.964.964-2.896-.29-.414A9.928 9.928 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
            </svg>
            Chat Zalo
          </a>
          
          <a 
            href={`tel:${phoneNumber}`}
            className="menu-item phone"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="menu-item-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Gọi điện
          </a>
        </div>
        
        <button 
          className={`phone-button ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu liên hệ"
        >
          <svg className="phone-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default PhoneButton;