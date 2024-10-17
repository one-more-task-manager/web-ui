import {axiosInstance} from "../axiosConfig.js";

class UserAPI {
    static async get() {
        const response = await axiosInstance.get(`/users/me`);
        return response.data;
    }
}

export {UserAPI}