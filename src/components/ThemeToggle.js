// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  return (
    <button
      className="btn btn-primary"
      onClick={() => setIsDarkTheme(!isDarkTheme)}
    >
      {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
