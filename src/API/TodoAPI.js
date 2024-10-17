import {axiosInstance} from "../axiosConfig.js";


class TodoAPI {
    static async getAll() {
        const response = await axiosInstance.get('/todolists');
        return response.data;
    }

    static async create(title) {
        await axiosInstance.post('/todolists', {title});
    }

    static async update(todolistId, title) {
        await axiosInstance.patch(`/todolists/${todolistId}`, {title});
    }

    static async delete(todolistId) {
        await axiosInstance.delete(`/todolists/${todolistId}`);
    }
}

export {TodoAPI};
