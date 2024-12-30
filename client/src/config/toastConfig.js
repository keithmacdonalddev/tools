// src/config/toastConfig.js

// Import required CSS for react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Configuration object for toast notifications
// Simplified to remove problematic props while maintaining functionality
export const toastConfig = {
    // Position of the toast on the screen
    position: 'top-right',

    // How long the toast will be displayed (in milliseconds)
    autoClose: 5000,

    // Allow user to close toast manually
    closeOnClick: true,

    // Show close button
    closeButton: true,

    // Show progress bar
    hideProgressBar: false,

    // Allow toast to be dragged
    draggable: true,

    // Use dark theme for better integration with our dark UI
    theme: 'dark',

    // Custom styles for better visual integration
    style: {
        background: '#1f2937', // Dark background
        color: '#fff', // White text
        borderRadius: '0.5rem',
        border: '1px solid rgba(107, 114, 128, 0.1)',
    },
};
