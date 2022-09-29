/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface canvasState {
    canvas: HTMLCanvasElement | null
    undoList: string[]
    redoList: string[]
}

const initialState: canvasState = {
    canvas: null,
    undoList: [],
    redoList: [],    
}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setCanvas(state, action: PayloadAction<any>) {
            state.canvas = action.payload;
        },
        pushToUndo(state, action: PayloadAction<any>) {
            state.undoList.push(action.payload);
        },
        pushToRedo(state, action: PayloadAction<any>) {
            state.redoList.push(action.payload);
        },
        undo(state) {
            const canvas = state.canvas!;
            const ctx = canvas.getContext('2d');
            if (state.undoList.length > 0) {
                const dataUrl = state.undoList.pop();
                state.redoList.push(canvas.toDataURL());
                const img = new Image();
                img.src = dataUrl!;
                img.onload = () => {
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            } else {
                state.redoList.push(canvas!.toDataURL());
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }
        },
        redo(state) {
            const canvas = state.canvas!;
            const ctx = canvas.getContext('2d');
            if (state.redoList.length > 0) {
                const dataUrl = state.redoList.pop();
                state.undoList.push(canvas.toDataURL());
                const img = new Image();
                img.src = dataUrl!;
                img.onload = () => {
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            } else {
                return state;
            }
        }
    }
});

export const { setCanvas, pushToRedo, pushToUndo, undo, redo } = canvasSlice.actions;