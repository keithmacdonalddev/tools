import PropTypes from 'prop-types';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-dark-bg text-white">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={() =>
                    setIsSidebarCollapsed(!isSidebarCollapsed)
                }
                className="z-20"
            />

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${
                    isSidebarCollapsed ? 'ml-12' : 'ml-48'
                } flex-1 flex flex-col`}
            >
                {/* Navbar */}
                <Navbar className="sticky top-0 z-10" />

                {/* Main Content Area */}
                <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
