import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-dark-bg text-white">
            <Sidebar className="z-20" />
            <div className="pl-64">
                {' '}
                {/* Matches sidebar width */}
                <Navbar className="sticky top-0 z-10" />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
