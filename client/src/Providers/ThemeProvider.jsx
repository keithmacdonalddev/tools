import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/ThemeContext';

export function ThemeProvider({ children }) {
    // Initialize theme state with a function to avoid unnecessary localStorage calls
    const [theme, setTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme || 'dark';
        } catch (error) {
            console.warn('Failed to read theme from localStorage:', error);
            return 'dark';
        }
    });

    // Effect to handle theme changes
    useEffect(() => {
        try {
            // Save theme to localStorage
            localStorage.setItem('theme', theme);

            // Update document theme
            const root = document.documentElement;
            root.setAttribute('data-theme', theme);

            // Toggle dark class
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        } catch (error) {
            console.warn('Failed to set theme:', error);
        }
    }, [theme]);

    // Toggle theme function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// PropTypes validation
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
