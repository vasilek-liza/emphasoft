import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/AuthAPI";
import { registrationAPI } from "../../api/Registration";
import { userAPI } from "../../api/UserAPI";
import { setUsername } from "./AuthSlice";

export const getToken = createAsyncThunk("getToken", async (data, thunkAPI) => {
    try {
        const { data: { token }} = await authAPI.getToken(data);
        userAPI.setToken(token);
        thunkAPI.dispatch(setUsername(data.username));
        registrationAPI.setToken(token);
        return token;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

