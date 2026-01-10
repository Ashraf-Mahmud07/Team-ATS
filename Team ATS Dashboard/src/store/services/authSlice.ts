import { UserState } from '@/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const persistedUser = localStorage.getItem('user');
const initialState: UserState = persistedUser
    ? JSON.parse(persistedUser)
    : {
        userData: null,
        access_token: '',
    };

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (
            state,
            action: PayloadAction<{ userData: UserState['userData']; access_token: string }>
        ) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.userData = action.payload.userData;
            state.access_token = action.payload.access_token;
        },
        logoutUser: (state) => {
            state.userData = null;
            state.access_token = '';
            localStorage.removeItem('user');
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
