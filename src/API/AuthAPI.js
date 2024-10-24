import {axiosInstance} from "../axiosConfig.js";

class AuthAPI {
    static async signUp(email, password) {
        await axiosInstance.post(`/auth/sign-up`, {
            email,
            password,
        });
    }

    static async signIn(email, password) {
        const response = await axiosInstance.post(`/auth/sign-in`, {
            email,
            password,
        });
        return response.data;
    }

    static async me() {
        const response = await axiosInstance.get(`/auth/me`);
        return response.data;
    }
}

export {AuthAPI};