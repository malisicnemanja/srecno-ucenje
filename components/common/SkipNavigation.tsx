'use client'

import React from 'react'

const SkipNavigation: React.FC = () => {
  return (
    <nav role="navigation" aria-label="Brza navigacija" className="skip-navigation">
      <ul className="skip-list">
        <li>
          <a 
            href="#main-content" 
            className="skip-link"
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')}
          >
            Preskoči na glavni sadržaj
          </a>
        </li>
        <li>
          <a 
            href="#primary-navigation" 
            className="skip-link"
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')}
          >
            Preskoči na glavnu navigaciju
          </a>
        </li>
        <li>
          <a 
            href="#footer-content" 
            className="skip-link"
            onFocus={(e) => e.target.classList.add('focused')}
            onBlur={(e) => e.target.classList.remove('focused')}
          >
            Preskoči na podnožje stranice
          </a>
        </li>
      </ul>
      
      <style jsx>{`
        .skip-navigation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          pointer-events: none;
        }
        
        .skip-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 8px;
          padding: 8px;
        }
        
        .skip-link {
          position: absolute;
          top: -120px;
          left: 0;
          background: var(--brand-night);
          color: white;
          padding: 12px 16px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          pointer-events: auto;
          border: 2px solid transparent;
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        .skip-link:focus,
        .skip-link.focused {
          top: 8px;
          outline: none;
          border-color: var(--brand-sun);
          box-shadow: 0 0 0 2px var(--brand-sun);
        }
        
        .skip-link:hover {
          background: var(--brand-grass);
          transform: translateY(-1px);
        }
        
        /* Ensure skip links work with different viewports */
        @media (max-width: 768px) {
          .skip-link {
            font-size: 16px;
            padding: 14px 18px;
            min-width: 48px;
            min-height: 48px;
          }
        }
      `}</style>
    </nav>
  )
}

export default SkipNavigation