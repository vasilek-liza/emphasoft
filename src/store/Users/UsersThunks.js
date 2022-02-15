import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/UserAPI";
import { setAccount } from "../Auth/AuthSlice";

export const getUsers = createAsyncThunk("getUsers", async (data, thunkAPI) => {
    try {
        const resposnse = await userAPI.getUsers();
        thunkAPI.dispatch(setAccount(resposnse.data))
        return resposnse.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const getUser = createAsyncThunk("getUser", async (id, thunkAPI) => {
    try {
        const response = await userAPI.getUser(id);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const updateUser =  createAsyncThunk("updateUser", async ({id, data}, thunkAPI) => {
    try {
        const response = await userAPI.updateUser(id, {
            username: data.username,
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password,
            is_active: data.isActive,
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const deleteUser = createAsyncThunk("deteleUser", async (id, thunkAPI) => {
    try {
        const response = await userAPI.deleteUser(id);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
})
