// client/src/features/cases/slice/casesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { casesApi } from '../../../services/api';

// Async thunks
export const fetchCases = createAsyncThunk(
    'cases/fetchCases',
    async (params, { rejectWithValue }) => {
        try {
            const response = await casesApi.getCases(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCase = createAsyncThunk(
    'cases/fetchCase',
    async (id, { rejectWithValue }) => {
        try {
            const response = await casesApi.getCase(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createCase = createAsyncThunk(
    'cases/createCase',
    async (data, { rejectWithValue }) => {
        try {
            const response = await casesApi.createCase(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCase = createAsyncThunk(
    'cases/updateCase',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await casesApi.updateCase(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCase = createAsyncThunk(
    'cases/deleteCase',
    async (id, { rejectWithValue }) => {
        try {
            await casesApi.deleteCase(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const casesSlice = createSlice({
    name: 'cases',
    initialState: {
        cases: [],
        currentCase: null,
        fieldDefinitions: [
            { id: 'caseNumber', label: 'Case Number', type: 'text', required: true },
            { id: 'subject', label: 'Subject', type: 'text', required: true },
            { id: 'description', label: 'Description', type: 'textarea', required: true },
            { id: 'contactName', label: 'Contact Name', type: 'text', required: true },
            { id: 'businessName', label: 'Business Name', type: 'text', required: true },
            { id: 'coid', label: 'COID', type: 'text', required: true },
            { id: 'mid', label: 'MID', type: 'text', required: true },
            { id: 'department', label: 'Department', type: 'text', required: true }
        ],
        customFields: [],
        status: 'idle',
        error: null,
        pagination: {
            page: 1,
            total: 0,
            pages: 0
        }
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cases
            .addCase(fetchCases.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cases = action.payload.data.cases;
                state.pagination = {
                    page: action.payload.data.page,
                    total: action.payload.data.total,
                    pages: action.payload.data.pages
                };
            })
            .addCase(fetchCases.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch cases';
            })
            // Fetch single case
            .addCase(fetchCase.fulfilled, (state, action) => {
                state.currentCase = action.payload.data;
            })
            // Create case
            .addCase(createCase.fulfilled, (state, action) => {
                state.cases.unshift(action.payload.data);
            })
            // Update case
            .addCase(updateCase.fulfilled, (state, action) => {
                const index = state.cases.findIndex(c => c.id === action.payload.data.id);
                if (index !== -1) {
                    state.cases[index] = action.payload.data;
                }
                if (state.currentCase?.id === action.payload.data.id) {
                    state.currentCase = action.payload.data;
                }
            })
            // Delete case
            .addCase(deleteCase.fulfilled, (state, action) => {
                state.cases = state.cases.filter(c => c.id !== action.payload);
                if (state.currentCase?.id === action.payload) {
                    state.currentCase = null;
                }
            });
    }
});

export const { setStatus, clearError } = casesSlice.actions;

// Selectors
export const selectAllCases = (state) => state.cases.cases;
export const selectCurrentCase = (state) => state.cases.currentCase;
export const selectCasesStatus = (state) => state.cases.status;
export const selectCasesError = (state) => state.cases.error;
export const selectFieldDefinitions = (state) => [
    ...state.cases.fieldDefinitions,
    ...state.cases.customFields
];
export const selectPagination = (state) => state.cases.pagination;

export default casesSlice.reducer;