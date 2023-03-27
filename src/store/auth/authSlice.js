import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'checking', // 'authenticated','not-authenticated',
    user: {},
    errorMessage: undefined
}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        checking: (state) => {
            state.status = 'checking';
            state.user = {},
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload,
            state.errorMessage = undefined;
        },
    },
})

// Action creators are generated for each case reducer function
export const { checking, onLogin } = AuthSlice.actions;
