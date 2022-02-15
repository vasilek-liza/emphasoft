import { BaseAPI } from "./BaseAPI";

class AuthAPI extends BaseAPI {
    static token =  "";

    getToken = (data) => {
        return this.postMethod("/api-token-auth/", data);
    }
}

export const authAPI = new AuthAPI();