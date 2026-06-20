import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '../services/storageService';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    StorageService.isDarkTheme().then(setIsDark);
  }, []);

  const toggleTheme = async () => {
    const newVal = !isDark;
    setIsDark(newVal);
    await StorageService.setDarkTheme(newVal);
  };

  const colors = isDark ? {
    background: '#1A1A1A',
    card: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    primary: '#148F77',
    border: '#404040',
    input: '#2D2D2D',
  } : {
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#888888',
    primary: '#148F77',
    border: '#E0E0E0',
    input: '#FFFFFF',
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
