import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icons } from '../../constants/icons';

const Sidebar = ({ className = '' }) => {
    // State to track if sidebar is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    // Navigation items
    const navItems = [
        { icon: Icons.Home, label: 'Dashboard', path: '/' },
        { icon: Icons.Cases, label: 'Cases', path: '/cases' },
        { icon: Icons.Settings, label: 'Settings', path: '/settings' },
    ];

    // Function to toggle sidebar collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            className={`
            ${className}
            fixed left-0 top-0 h-full bg-dark-surface
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-16' : 'w-64'}
            flex flex-col
            border-r border-primary/10
          `}
        >
            {/* Sidebar Header */}
            <div className="flex items-center h-16 px-4 border-b border-primary/10">
                {!isCollapsed && (
                    <span className="text-xl font-semibold text-primary">
                        Tools
                    </span>
                )}
                <button
                    onClick={toggleCollapse}
                    className="ml-auto p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    aria-label={
                        isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                    }
                >
                    <Icons.Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-4">
                <ul className="space-y-2">
                    {navItems.map(({ icon: Icon, label, path }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`
                      flex items-center px-4 py-2 mx-2 rounded-lg
                      transition-colors duration-200
                      ${
                          location.pathname === path
                              ? 'bg-primary text-white'
                              : 'hover:bg-primary/10'
                      }
                    `}
                            >
                                <Icon className="w-5 h-5 min-w-[1.25rem]" />
                                {!isCollapsed && (
                                    <span className="ml-3">{label}</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    className: PropTypes.string,
};

export default Sidebar;
