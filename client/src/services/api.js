// services/api.js

import axios from 'axios';

// Create axios instance with base URL from environment variables
const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'https://tools-api-chi.vercel.app/api', // Fixed hardcoded URL for testing
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for logging outgoing requests
api.interceptors.request.use((request) => {
    console.log('Outgoing request:', request); // Debugging: Log request details
    return request;
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log('Incoming response:', response); // Debugging: Log response details
        return response;
    },
    (error) => {
        // Improved error handling with detailed logging
        console.error('API Error Details:', {
            message: error.response?.data?.message || 'An error occurred',
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data,
            },
        });

        // Return rejected promise with error details for component handling
        return Promise.reject({
            message: error.response?.data?.message || 'An error occurred',
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

// Cases API
export const casesApi = {
    // Get all cases with optional filters
    getCases: (params) => api.get('/cases', { params }),

    // Get single case by ID
    getCase: (id) => api.get(`/cases/${id}`),

    // Create new case with improved error handling
    createCase: async (data) => {
        try {
            // Log the data being sent
            console.log('Creating case with data:', data);

            // Make the API request
            const response = await api.post('/cases', data);

            // Log successful response
            console.log('Case created successfully:', response.data);

            return response;
        } catch (error) {
            // Log detailed error information
            console.error('Error creating case:', {
                message: error.message,
                data: error.data,
                status: error.status,
            });

            throw error; // Re-throw for component handling
        }
    },

    // Update case
    updateCase: (id, data) => api.patch(`/cases/${id}`, data),

    // Delete case
    deleteCase: (id) => api.delete(`/cases/${id}`),

    // Custom fields
    getCustomFields: () => api.get('/cases/custom-fields'),
    addCustomField: (data) => api.post('/cases/custom-fields', data),
    deleteCustomField: (id) => api.delete(`/cases/custom-fields/${id}`),
};

export default api;
