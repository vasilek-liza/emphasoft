import { BaseAPI } from "./BaseAPI";

class RegistrationAPI extends BaseAPI {

    setToken = (token) => {
        this.instance.defaults.headers.Authorization = "Token " + token;
    }

    registration = (data) => {
        return this.postMethod("/api/v1/users/", data);
    }
}

export const registrationAPI = new RegistrationAPI();