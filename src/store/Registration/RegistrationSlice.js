import { createSlice } from "@reduxjs/toolkit";
import { registration } from "./RegistrationThunks";

const initialState = {
    data: [],
    error: "",
    loading: false
};

export const RegistrationSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [registration.pending.type]: (state, action) => {
            state.loading = true
        },
        [registration.fulfilled.type]: (state, action) => {
            state.loading = false
            state.error = ""
            state.data = action.payload
        },
        [registration.rejected.type]: (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.payload
        }
    },
});

export const registrationReducer = RegistrationSlice.reducer;