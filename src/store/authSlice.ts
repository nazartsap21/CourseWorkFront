import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from "../services/AuthService.ts";

export const register = createAsyncThunk(
    'auth/register',
    async (data: { email: string, password: string, firstName: string, lastName: string }) => {
        return await AuthService.register(data.email, data.password, data.firstName, data.lastName)
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async (data: { email: string, password: string }) => {
        return await AuthService.login(data.email, data.password)
    }
)

interface AuthState {
    status: string,
    error: string | null,
    isAuth: boolean,
}

const initialState: AuthState = {
    status: 'pending',
    error: null,
    isAuth: false,
}

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        return await AuthService.checkAuth()
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.status = 'pending';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'pending';
                state.isAuth = false;
                state.error = null;
            })
            .addCase(login.pending, (state) => {
                state.status = 'pending';
                state.isAuth = false;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.status = 'fulfilled';
                state.isAuth = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.status = 'fulfilled';
                state.isAuth = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'rejected';
                state.isAuth = false;
                state.error = action.payload as string;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'rejected';
                state.isAuth = false;
                state.error = action.payload as string;
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'pending';
                state.isAuth = false;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state) => {
                state.status = 'fulfilled';
                state.isAuth = true;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'rejected';
                state.isAuth = false;
                state.error = action.payload as string;
            });
    },
})

const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

export {initialState};

export default authReducer;