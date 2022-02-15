import { BaseAPI } from "./BaseAPI";
import { useSelector } from 'react-redux';

class UserAPI extends BaseAPI {

    setToken = (token) => {
        this.instance.defaults.headers.Authorization = "Token " + token;
    }

    getUsers = () => {
        return this.getMethod("/api/v1/users/");
    }

    getUser = (id) => {
        return this.getMethod("/api/v1/users/" + id);
    }

    updateUser = (id, data) => {
        return this.putMethod("/api/v1/users/" + id + "/", data);
    }

    deleteUser = (id) => {
        return this.deleteMethod("/api/v1/users/" + id);
    }
}

export const userAPI = new UserAPI();