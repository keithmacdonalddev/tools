// src/components/common/ErrorBoundary.jsx

// Import Component for class component usage
import { Component } from 'react';
// Import PropTypes for type checking
import PropTypes from 'prop-types';
// Import toast for error notifications
import { toast } from 'react-toastify';

// ErrorBoundary component catches JavaScript errors anywhere in its child component tree
class ErrorBoundary extends Component {
    // Initialize state in constructor
    constructor(props) {
        super(props);
        this.state = {
            hasError: false, // Tracks if an error occurred
            error: null, // Stores the error information
        };
    }

    // Static method that runs when an error occurs
    // Returns the new state based on the error
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    // Lifecycle method that catches errors
    componentDidCatch(error, errorInfo) {
        // Log the error to console in development
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Show simple error toast notification
        toast.error('An unexpected error occurred', {
            position: 'top-right',
            autoClose: 5000,
        });
    }

    // Handle retry button click
    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        // If there's an error, show the fallback UI
        if (this.state.hasError) {
            return (
                <div className="min-h-[200px] flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg border border-red-500">
                    <h2 className="text-xl font-semibold text-red-500 mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-gray-300 text-center mb-4">
                        {this.state.error?.message ||
                            'An unexpected error occurred'}
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg 
                                 hover:bg-red-600 transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        // If no error, render the children normally
        return this.props.children;
    }
}

// PropTypes validation
ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
