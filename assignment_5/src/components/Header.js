import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import '../styles/Header.css';

const Header = ({ toggleSidebar, currentPage }) => {
  const { theme, accentColor, toggleTheme, changeAccentColor, accentColors } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const formatPageTitle = (page) => {
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="page-title">{formatPageTitle(currentPage)}</h1>
      </div>
      
      <div className="header-right">
        <div className="theme-selector">
          <button 
            className="theme-toggle"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {showThemeMenu && (
            <div className="theme-menu">
              <button onClick={toggleTheme}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <div className="accent-colors">
                <span>Accent Color:</span>
                <div className="color-options">
                  {accentColors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${color} ${accentColor === color ? 'active' : ''}`}
                      onClick={() => changeAccentColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="user-profile">
          <div className="profile-avatar">👤</div>
          <span className="profile-name">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;