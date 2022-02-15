import { createAsyncThunk } from "@reduxjs/toolkit";
import { registrationAPI } from "../../api/Registration";

export const registration = createAsyncThunk("registration", async (data, thunkAPI) => {
    try {
        const { username, firstName, lastName, password, isActive } = data;
        const response = await registrationAPI.registration({
            username,
            password,
            first_name: firstName,
            last_name: lastName,
            is_active: isActive,
        })
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

