import { configureStore } from '@reduxjs/toolkit';
import { canvasSlice } from './slices/canvasSlice';
import { sessionSlice } from './slices/sessionSlice';
import { toolSlice } from './slices/toolSlice';

const store = configureStore({
    reducer: {
        [canvasSlice.name]: canvasSlice.reducer,
        [toolSlice.name]: toolSlice.reducer,
        [sessionSlice.name]: sessionSlice.reducer,
    }
});

export default store;