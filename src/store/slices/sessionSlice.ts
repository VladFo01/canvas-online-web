import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface sessionState {
    id: string
    socket: WebSocket | null
    username: string
}

const initialState: sessionState = {
    id: '',
    socket: null,
    username: ''
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setSessionId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        },
        setSocket(state, action: PayloadAction<WebSocket>) {
            state.socket = action.payload;
        }
    }
});
export const { setSessionId, setSocket, setUsername } = sessionSlice.actions;