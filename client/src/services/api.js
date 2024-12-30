import axios from 'axios';

// Create axios instance with base URL from environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
        const message = error.response?.data?.message || 'An error occurred';
        console.error('API Error:', message); // Debugging: Log error details
        return Promise.reject(error);
    }
);

// Cases API
export const casesApi = {
    // Get all cases with optional filters
    getCases: (params) => api.get('/cases', { params }),

    // Get single case by ID
    getCase: (id) => api.get(`/cases/${id}`), // Fixed syntax for string interpolation

    // Create new case
    createCase: (data) => api.post('/cases', data),

    // Update case
    updateCase: (id, data) => api.patch(`/cases/${id}`, data), // Fixed syntax for string interpolation

    // Delete case
    deleteCase: (id) => api.delete(`/cases/${id}`), // Fixed syntax for string interpolation

    // Custom fields
    getCustomFields: () => api.get('/cases/custom-fields'),
    addCustomField: (data) => api.post('/cases/custom-fields', data),
    deleteCustomField: (id) => api.delete(`/cases/custom-fields/${id}`), // Fixed syntax for string interpolation
};

export default api;
