import Axios from "axios";

export class BaseAPI {
    static baseURL = "https://emphasoft-test-assignment.herokuapp.com/";
    
    constructor() {
        this.instance = Axios.create({
            baseURL: BaseAPI.baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    getMethod = (...args) => {
        return this.instance.get(...args);
    };

    postMethod = (...args) => {
        return this.instance.post(...args);
    };

    putMethod = (...args) => {
        return this.instance.put(...args);
    }

    putchMethod = (...args) => {
        return this.instance.patch(...args);
    }

    deleteMethod = (id) => {
        return this.instance.delete(id)
    }
}
