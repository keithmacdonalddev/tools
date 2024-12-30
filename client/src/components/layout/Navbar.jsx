import { useTheme } from '../../hooks/useTheme';
import { Icons } from '../../constants/icons';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const Navbar = ({ className = '' }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/cases':
                return 'Cases';
            case '/settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    };

    return (
        <header
            className={` 
                ${className}
                h-12 bg-dark-surface /* Match Sidebar header height */
                border-b border-primary/10
                flex items-center justify-between px-4 w-full
            `}
        >
            <h1 className="text-sm font-medium">{getPageTitle()}</h1>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded hover:bg-primary/10 transition-colors"
                >
                    {theme === 'dark' ? (
                        <Icons.Sun className="w-4 h-4" />
                    ) : (
                        <Icons.Moon className="w-4 h-4" />
                    )}
                </button>
                <div className="w-6 h-6 bg-primary/20 rounded-full" />
            </div>
        </header>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
