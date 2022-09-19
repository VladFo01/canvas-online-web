import { configureStore } from '@reduxjs/toolkit';
import { canvasSlice } from './slices/canvasSlice';
import { toolSlice } from './slices/toolSlice';

const store = configureStore({
    reducer: {
        [canvasSlice.name]: canvasSlice.reducer,
        [toolSlice.name]: toolSlice.reducer
    }
});

export default store;