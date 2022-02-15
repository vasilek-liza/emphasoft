import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./Auth/AuthSlice";
import { usersReducer } from './Users/UsersSlice';
import { registrationReducer } from "./Registration/RegistrationSlice";


const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    registrationReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
};