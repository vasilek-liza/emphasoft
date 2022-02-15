import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUser, updateUser, deleteUser } from "./UsersThunks";

const initialState = {
    users: [],
    user: {},
    modifidedUsers: [],
    error: "",
    loading: false,
    sortUp: false,
    userErrorMessage: "",
    deleteProfile: false,
};

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        sorting(state) {
            state.sortUp = !state.sortUp;
            if (state.sortUp) {
                state.modifidedUsers.sort((a, b) => b.id - a.id);
            } else {
                state.modifidedUsers.sort((a, b) => a.id - b.id);
            }
        },
        searchUsers(state, value) {
            state.modifidedUsers = state.users.filter(user => {
                return user.username.includes(value.payload);
            });
        },
        resetUsers(state) {
            state.users = []
            state.modifidedUsers = []
            state.sortUp = false
        },
        resetUser(state) {
            state.user = {}
        },
        toggleDelete(state) {
            state.deleteProfile = !state.deleteProfile;
        }
    },
    extraReducers: {
        [getUsers.fulfilled.type]: (state, action) => {
            state.error = ""
            state.loading = false
            state.users = action.payload
            state.modifidedUsers = action.payload
        },
        [getUsers.rejected.type]: (state, action) => {
            state.users = []
            state.error = action.payload
        },
        [getUsers.pending.type]: (state, action) => {
            state.loading = true
        },
        [getUser.fulfilled.type]: (state, action) => {
            state.user = action.payload;
        },
        [getUser.rejected.type]: (state, action) => {
            state.userErrorMessage = action.payload;
        },
        [updateUser.fulfilled.type]: (state, action) => {
        },
        [updateUser.rejected.type]: (state, action) => {
            state.userErrorMessage = action.payload;
        },
        [deleteUser.rejected.type]: (state, action) => {
        }
    },
});

export const usersReducer = UsersSlice.reducer;
export const { sorting, searchUsers, resetUsers, resetUser, toggleDelete } = UsersSlice.actions;