// client/src/services/api.js

import axios from 'axios';

// Create axios instance with base URL from environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

// Cases API
export const casesApi = {
    // Get all cases with optional filters
    getCases: (params) => api.get('/cases', { params }),

    // Get single case by ID
    getCase: (id) => api.get(`/cases/${id}`),

    // Create new case
    createCase: (data) => api.post('/cases', data),

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
