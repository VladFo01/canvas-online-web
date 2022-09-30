import { configureStore } from '@reduxjs/toolkit';
import { canvasSlice } from './slices/canvasSlice';
import { sessionSlice } from './slices/sessionSlice';
import { toolSlice } from './slices/toolSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [canvasSlice.name]: canvasSlice.reducer,
        [toolSlice.name]: toolSlice.reducer,
        [sessionSlice.name]: sessionSlice.reducer,
    }
});

export default store;