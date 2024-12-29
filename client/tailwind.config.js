/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    // Extending the default theme with your custom colors
    theme: {
        extend: {
            colors: {
                primary: '#9c78ff', // Purple accent
                secondary: '#83e8ff', // Light blue
                accent: '#61dfb8', // Green accent
                lavender: '#e7deff', // Light purple
                'dark-bg': '#1a1a1a', // Dark background
                'dark-surface': '#2d2d2d', // Dark surface
            },
        },
    },
    // Enable dark mode
    darkMode: 'class',
    plugins: [],
};
