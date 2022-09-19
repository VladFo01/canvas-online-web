import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface canvasState {
    canvas: HTMLCanvasElement | null
}

const initialState: canvasState = {
    canvas: null
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setCanvas(state, action: PayloadAction<any>) {
            state.canvas = action.payload;
        }
    }
});

export const { setCanvas } = canvasSlice.actions;