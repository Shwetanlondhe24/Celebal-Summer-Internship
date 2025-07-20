import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('blue');

  const themes = {
    light: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8f9fa',
      '--bg-tertiary': '#e9ecef',
      '--text-primary': '#212529',
      '--text-secondary': '#6c757d',
      '--border-color': '#dee2e6',
      '--shadow': '0 2px 4px rgba(0,0,0,0.1)',
      '--sidebar-bg': '#ffffff',
      '--header-bg': '#ffffff'
    },
    dark: {
      '--bg-primary': '#1a1a1a',
      '--bg-secondary': '#2d2d2d',
      '--bg-tertiary': '#404040',
      '--text-primary': '#ffffff',
      '--text-secondary': '#b0b0b0',
      '--border-color': '#404040',
      '--shadow': '0 2px 4px rgba(0,0,0,0.3)',
      '--sidebar-bg': '#1a1a1a',
      '--header-bg': '#1a1a1a'
    }
  };

  const accentColors = {
    blue: '#007bff',
    green: '#28a745',
    purple: '#6f42c1',
    orange: '#fd7e14',
    red: '#dc3545'
  };

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];
    
    Object.entries(currentTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    root.style.setProperty('--accent-color', accentColors[accentColor]);
  }, [theme, accentColor]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      accentColor,
      toggleTheme,
      changeAccentColor,
      themes: Object.keys(themes),
      accentColors: Object.keys(accentColors)
    }}>
      {children}
    </ThemeContext.Provider>
  );
};