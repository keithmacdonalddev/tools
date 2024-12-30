// features/cases/slice/casesSlice.js

// Import necessary functions from Redux Toolkit
import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from '@reduxjs/toolkit';

// Import our API service that handles all HTTP requests
import { casesApi } from '../../../services/api';

// Create an async thunk for adding a new case
export const addCase = createAsyncThunk(
    'cases/addCase',
    async (caseData, { rejectWithValue }) => {
        try {
            // Try to create the case via API
            const response = await casesApi.createCase(caseData);
            // Log success for debugging
            console.log('Case creation response:', response.data);
            // Return the case data from the response
            return response.data.data; // Access the actual case data from the response
        } catch (error) {
            // Log error for debugging
            console.error('API error:', error.response?.data || error.message);
            // Return error message which will be available in rejected action
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create an async thunk for fetching all cases
export const fetchCases = createAsyncThunk(
    'cases/fetchCases',
    async (params, { rejectWithValue }) => {
        try {
            const response = await casesApi.getCases(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create an async thunk for deleting a case
export const deleteCase = createAsyncThunk(
    'cases/deleteCase',
    async (caseId, { rejectWithValue }) => {
        try {
            await casesApi.deleteCase(caseId);
            return caseId;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create the cases slice
const casesSlice = createSlice({
    name: 'cases',
    // Initial state of our cases feature
    initialState: {
        cases: [],
        currentCase: null,
        fieldDefinitions: [
            {
                id: 'caseNumber',
                label: 'Case Number',
                type: 'text',
                required: true,
                isDefault: true,
            },
            {
                id: 'subject',
                label: 'Subject',
                type: 'text',
                required: true,
                isDefault: true,
            },
            {
                id: 'description',
                label: 'Description',
                type: 'textarea',
                required: true,
                isDefault: true,
            },
            {
                id: 'department',
                label: 'Department',
                type: 'select',
                options: ['Payments', 'Payroll', 'QBO'],
                required: true,
                isDefault: true,
            },
            {
                id: 'status',
                label: 'Status',
                type: 'select',
                options: ['open', 'closed'],
                defaultValue: 'open',
                required: true,
                isDefault: true,
            },
        ],
        customFields: [],
        status: 'idle',
        error: null,
        pagination: {
            page: 1,
            total: 0,
            pages: 0,
        },
        viewType: 'table',
        searchQuery: '',
        filters: {
            status: 'all',
            priority: 'all',
        },
    },
    // Regular reducers for synchronous actions
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setViewType: (state, action) => {
            state.viewType = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilter: (state, action) => {
            const { key, value } = action.payload;
            state.filters[key] = value;
        },
        addCustomField: (state, action) => {
            state.customFields.push(action.payload);
        },
        removeCustomField: (state, action) => {
            state.customFields = state.customFields.filter(
                (field) => field.id !== action.payload
            );
        },
    },
    // Handle async action lifecycles
    extraReducers: (builder) => {
        builder
            // Handle fetchCases states
            .addCase(fetchCases.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cases = action.payload.data.cases;
                state.pagination = {
                    page: action.payload.data.page,
                    total: action.payload.data.total,
                    pages: action.payload.data.pages,
                };
            })
            .addCase(fetchCases.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle addCase states
            .addCase(addCase.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCase.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add the new case to the beginning of the cases array
                state.cases.unshift(action.payload);
                // Update pagination total
                state.pagination.total += 1;
                // Recalculate pages if needed
                state.pagination.pages = Math.ceil(state.pagination.total / 10); // assuming 10 items per page
            })
            .addCase(addCase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Handle deleteCase states
            .addCase(deleteCase.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCase.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cases = state.cases.filter(
                    (case_) => case_.id !== action.payload
                );
                // Update pagination total
                state.pagination.total -= 1;
                // Recalculate pages if needed
                state.pagination.pages = Math.ceil(state.pagination.total / 10);
            })
            .addCase(deleteCase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Export individual actions
export const {
    setStatus,
    clearError,
    setViewType,
    setSearchQuery,
    setFilter,
    addCustomField,
    removeCustomField,
} = casesSlice.actions;

// Basic selectors
export const selectAllCases = (state) => state.cases.cases;
export const selectCurrentCase = (state) => state.cases.currentCase;
export const selectCasesStatus = (state) => state.cases.status;
export const selectCasesError = (state) => state.cases.error;
export const selectFieldDefinitions = (state) => [
    ...state.cases.fieldDefinitions,
    ...state.cases.customFields,
];
export const selectPagination = (state) => state.cases.pagination;
export const selectViewType = (state) => state.cases.viewType;
export const selectSearchQuery = (state) => state.cases.searchQuery;
export const selectFilters = (state) => state.cases.filters;

// Create a memoized selector for filtered cases
export const selectFilteredCases = createSelector(
    [selectAllCases, selectSearchQuery, selectFilters],
    (cases, searchQuery, filters) => {
        let filteredCases = [...cases];

        // Apply search filter if there's a query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredCases = filteredCases.filter(
                (case_) =>
                    case_.subject?.toLowerCase().includes(query) ||
                    case_.caseNumber?.toLowerCase().includes(query) ||
                    case_.description?.toLowerCase().includes(query)
            );
        }

        // Apply status filter if not showing all
        if (filters.status !== 'all') {
            filteredCases = filteredCases.filter(
                (case_) => case_.status === filters.status
            );
        }

        return filteredCases;
    }
);

export default casesSlice.reducer;
