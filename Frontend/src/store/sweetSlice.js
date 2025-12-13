import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
    sweets: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Fetch all sweets (with optional params)
export const fetchSweets = createAsyncThunk('sweets/getAll', async (params, thunkAPI) => {
    try {
        // params can be an object e.g. { search, category, minPrice, maxPrice }
        let queryString = '/sweets/search?';
        if (params) {
            if (params.search) queryString += `name=${params.search}&`;
            if (params.category) queryString += `category=${params.category}&`;
            if (params.minPrice) queryString += `minPrice=${params.minPrice}&`;
            if (params.maxPrice) queryString += `maxPrice=${params.maxPrice}&`;
        } else {
            // Fallback to get all if no params for dashboard load
            // Or use /sweets/search? which returns all if empty
        }
        const response = await api.get(queryString);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add new sweet
export const createSweet = createAsyncThunk('sweets/create', async (sweetData, thunkAPI) => {
    try {
        const response = await api.post('/sweets', sweetData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update sweet
export const updateSweet = createAsyncThunk('sweets/update', async ({ id, sweetData }, thunkAPI) => {
    try {
        const response = await api.put(`/sweets/${id}`, sweetData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete sweet
export const deleteSweet = createAsyncThunk('sweets/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/sweets/${id}`);
        return id;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Purchase sweet
export const purchaseSweet = createAsyncThunk('sweets/purchase', async ({ id, quantity }, thunkAPI) => {
    try {
        const response = await api.post(`/sweets/${id}/purchase`, { quantity });
        return { id, quantity }; // Return data to update UI optimistically or refetch
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const sweetSlice = createSlice({
    name: 'sweet',
    initialState,
    reducers: {
        resetSweets: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSweets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSweets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sweets = action.payload;
            })
            .addCase(fetchSweets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createSweet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sweets.push(action.payload);
            })
            .addCase(createSweet.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteSweet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.sweets = state.sweets.filter((sweet) => sweet._id !== action.payload);
            })
            .addCase(updateSweet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.sweets.findIndex(sweet => sweet._id === action.payload._id);
                if (index !== -1) {
                    state.sweets[index] = action.payload;
                }
            })
            .addCase(purchaseSweet.fulfilled, (state, action) => {
                // Optimistic update or just trigger re-fetch in component?
                // Ideally backend returns updated sweet, but purchase endpoint returns { message, remainingStock }
                // Let's rely on component re-fetching for simplicty, or update stock locally
                const index = state.sweets.findIndex(sweet => sweet._id === action.payload.id);
                if (index !== -1) {
                    state.sweets[index].quantity -= action.payload.quantity;
                }
            });
    },
});

export const { resetSweets } = sweetSlice.actions;
export default sweetSlice.reducer;
