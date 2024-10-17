import {axiosInstance} from "../axiosConfig.js";


class TaskAPI {
    static async getAll(todolistId) {
        const response = await axiosInstance.get(`/todolists/${todolistId}/tasks`);
        return response.data;
    }

    static async create(todolistId, title) {
        const response = await axiosInstance.post(`/todolists/${todolistId}/tasks`,
            {title}
        );
        return response.data;
    }

    static async update(todolistId, taskId, title, isDone) {
        const response = await axiosInstance.patch(`/todolists/${todolistId}/tasks/${taskId}`, {
            title,
            isDone,
        });
        return response.data;
    }

    static async delete(todolistId, taskId) {
        await axiosInstance.delete(`/todolists/${todolistId}/tasks/${taskId}`);
    }
}

export {TaskAPI};
