// src/App.jsx

// Import dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Settings from './pages/Settings';
import ErrorBoundary from './components/common/ErrorBoundary';
import { toastConfig } from './config/toastConfig';

// Main App component that sets up routing and global components
function App() {
    return (
        // Wrap the entire app in an ErrorBoundary for top-level error catching
        <ErrorBoundary>
            <Router>
                {/* Layout component provides consistent page structure */}
                <Layout>
                    {/* Define routes for different pages */}
                    <Routes>
                        {/* Each route is wrapped in its own ErrorBoundary */}
                        <Route
                            path="/"
                            element={
                                <ErrorBoundary>
                                    <Dashboard />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/cases"
                            element={
                                <ErrorBoundary>
                                    <Cases />
                                </ErrorBoundary>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ErrorBoundary>
                                    <Settings />
                                </ErrorBoundary>
                            }
                        />
                    </Routes>
                </Layout>
                {/* Global toast container with configuration */}
                <ToastContainer {...toastConfig} />
            </Router>
        </ErrorBoundary>
    );
}

export default App;
