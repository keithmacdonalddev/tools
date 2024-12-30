import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icons } from '../../constants/icons';

const Sidebar = ({ className = '', isCollapsed, toggleCollapse }) => {
    const location = useLocation();

    const navItems = [
        { icon: Icons.Home, label: 'Dashboard', path: '/' },
        { icon: Icons.Cases, label: 'Cases', path: '/cases' },
        { icon: Icons.Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside
            className={`
                ${className}
                fixed left-0 top-0 h-full bg-dark-surface
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-12' : 'w-48'}
                flex flex-col
                border-r border-primary/10
            `}
        >
            {/* Sidebar Header */}
            <div className="flex items-center h-12 px-3 border-b border-primary/10">
                {!isCollapsed && (
                    <span className="text-sm font-semibold text-primary">
                        Tools
                    </span>
                )}
                <button
                    onClick={toggleCollapse}
                    className="ml-auto p-1 rounded hover:bg-primary/10 transition-colors"
                    aria-label={
                        isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                    }
                >
                    <Icons.Menu className="w-4 h-4" />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-3">
                <ul className="space-y-1">
                    {navItems.map(({ icon: Icon, label, path }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`flex items-center ${
                                    isCollapsed ? 'justify-center' : 'px-3'
                                } py-2 mx-2 rounded-lg transition-colors duration-200 ${
                                    location.pathname === path
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-primary/10'
                                }`}
                            >
                                <Icon className="w-4 h-4 min-w-[1.25rem]" />
                                {!isCollapsed && (
                                    <span className="ml-2 text-xs">
                                        {label}
                                    </span>
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
    isCollapsed: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
};

export default Sidebar;
