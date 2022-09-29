import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

interface toolState {
    tool: any
    color: string
    fillColor: string
    width: number
}

const initialState: toolState = {
    tool: null,
    color: '#000',
    fillColor: '#000',
    width: 8
}

export const toolSlice = createSlice({
    name: 'tool',
    initialState,
    reducers: {
        setTool(state: toolState, action: PayloadAction<any>) {
            state.tool = action.payload;
        },
        setColor(state: toolState, action: PayloadAction<string>) {
            state.color = action.payload;
            if (state.tool) {
                state.tool.lineColor = action.payload;
            }
        },
        setFillColor(state: toolState, action: PayloadAction<string>) {
            state.fillColor = action.payload;
            if (state.tool) {
                state.tool.fillColor = action.payload;
            }
        },
        setWidth(state: toolState, action: PayloadAction<number>) {
            state.width = action.payload;
            if (state.tool) {
                state.tool.lineWidth = action.payload;
            }
        }
    }
});

export const { setColor, setTool, setFillColor, setWidth } = toolSlice.actions;