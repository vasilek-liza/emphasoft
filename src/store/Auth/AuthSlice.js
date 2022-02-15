import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "./AuthThunks";

const initialState = {
    loading: false,
    error: "",
    token: "",
    username: "",
    account: {}
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        removeToken(state, action) {
            state.token = "";
            state.username = "";
            state.account = {};
        },
        setUsername (state, action) {
            state.username = action.payload;
        },
        setAccount(state, action) {
            state.account = action.payload.find(user => user.username == state.username);
        }
    },
    extraReducers: {
        [getToken.pending.type]: (state, action) => {
            state.loading = true
        },
        [getToken.fulfilled.type]: (state, action) => {
            state.loading = false
            state.error = ""
            state.token = action.payload
        },
        [getToken.rejected.type]: (state, action) => {
            state.loading = false
            state.token = ""
            state.error = action.payload
        }
    },
});

export const authReducer = AuthSlice.reducer;
export const { removeToken, setUsername, setAccount } = AuthSlice.actions;