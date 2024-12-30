import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from '@reduxjs/toolkit';
import { casesApi } from '../../../services/api';

// Async thunk to add a case
export const addCase = createAsyncThunk(
    'cases/addCase',
    async (caseData, { rejectWithValue }) => {
        try {
            const response = await casesApi.createCase(caseData);
            console.log('Request to API successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('API error:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk to fetch cases
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

const casesSlice = createSlice({
    name: 'cases',
    initialState: {
        cases: [],
        currentCase: null,
        fieldDefinitions: [
            // Default fields
            {
                id: 'caseNumber',
                label: 'Case Number',
                type: 'text',
                required: true,
            },
            { id: 'subject', label: 'Subject', type: 'text', required: true },
            {
                id: 'description',
                label: 'Description',
                type: 'textarea',
                required: true,
            },
            {
                id: 'contactName',
                label: 'Contact Name',
                type: 'text',
                required: true,
            },
            {
                id: 'businessName',
                label: 'Business Name',
                type: 'text',
                required: true,
            },
            { id: 'coid', label: 'COID', type: 'text', required: true },
            { id: 'mid', label: 'MID', type: 'text', required: true },
            {
                id: 'department',
                label: 'Department',
                type: 'text',
                required: true,
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
        viewType: 'table', // Default view type
        searchQuery: '',
        filters: {
            status: 'all',
            priority: 'all',
        },
    },
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
    extraReducers: (builder) => {
        builder
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
            .addCase(addCase.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCase.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cases.push(action.payload);
            })
            .addCase(addCase.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Export actions
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

// View management selectors
export const selectViewType = (state) => state.cases.viewType;
export const selectSearchQuery = (state) => state.cases.searchQuery;
export const selectFilters = (state) => state.cases.filters;

// Filtered cases selector
export const selectFilteredCases = createSelector(
    [selectAllCases, selectSearchQuery, selectFilters],
    (cases, searchQuery, filters) => {
        let filteredCases = [...cases];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredCases = filteredCases.filter(
                (case_) =>
                    case_.subject?.toLowerCase().includes(query) ||
                    case_.caseNumber?.toLowerCase().includes(query) ||
                    case_.description?.toLowerCase().includes(query)
            );
        }

        // Apply status filter
        if (filters.status !== 'all') {
            filteredCases = filteredCases.filter(
                (case_) => case_.status === filters.status
            );
        }

        // Apply priority filter
        if (filters.priority !== 'all') {
            filteredCases = filteredCases.filter(
                (case_) => case_.priority === filters.priority
            );
        }

        return filteredCases;
    }
);

export default casesSlice.reducer;
