import { useTheme } from '../../hooks/useTheme';
import { Icons } from '../../constants/icons';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const Navbar = ({ className = '' }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Get page title based on current route
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
            h-16 bg-dark-surface
            border-b border-primary/10
            flex items-center justify-between px-4
          `}
        >
            <div className="flex items-center">
                <h1 className="text-lg font-medium">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    aria-label={`Switch to ${
                        theme === 'dark' ? 'light' : 'dark'
                    } theme`}
                >
                    {theme === 'dark' ? (
                        <Icons.Sun className="w-5 h-5" />
                    ) : (
                        <Icons.Moon className="w-5 h-5" />
                    )}
                </button>

                {/* Profile Section - We can expand this later */}
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full" />
                </div>
            </div>
        </header>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
