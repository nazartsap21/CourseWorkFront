import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileState } from '../interfaces/globalInterfaces';
import ProfileServices from '../services/ProfileServices';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
    const response = await ProfileServices.getProfile();
    return response.data;
});

export const connectDevice = createAsyncThunk(
    'profile/connectDevice',
    async (deviceId: string) => {
        const response = await ProfileServices.connectDevice(deviceId);
        return response.data;
    }
);

export const disconnectDevice = createAsyncThunk(
    'profile/disconnectDevice',
    async (deviceId: string) => {
        const response = await ProfileServices.disconnectDevice(deviceId);
        return response.data;
    }
);

export const updateDevice = createAsyncThunk(
    'profile/updateDevice',
    async (data: { deviceId: string; name: string; location: string }) => {
        const response = await ProfileServices.updateDevice(data.deviceId, data.name, data.location);
        return response.data;
    }
);

export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async (newPassword: string) => {
        const response = await ProfileServices.changePassword(newPassword);
        return response.data;
    }
);

export const forgotPassword = createAsyncThunk(
    'profile/forgotPassword',
    async (data: { email: string; newPassword: string }) => {
        const response = await ProfileServices.forgotPassword(data.email, data.newPassword);
        return response.data;
    }
);

const initialState: ProfileState = {
    profile: null,
    status: 'idle',
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

const profileReducer = profileSlice.reducer;


export {initialState};

export default profileReducer;