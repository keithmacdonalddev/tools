// src/contexts/ThemeContext.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
const ThemeContext = createContext();

// Create the provider component
export function ThemeProvider({ children }) {
    // State for managing theme
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        // Optionally save theme preference to localStorage
        localStorage.setItem('darkMode', !isDarkMode);
    };

    // Value object to be provided to consumers
    const value = {
        isDarkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

// Add PropTypes for type checking
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Export the context for use with useContext
export default ThemeContext;
