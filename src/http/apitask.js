import api from "@/utils/request";

const resource = "/api/" + "v1/tasks";

export const allTasks = () => api.get(resource);

export const storeTasks = (task) => api.post(resource, task);

export const updateTasks = (id, task) => api.put(`${resource}/${id}`, task);

export const deleteTasks = (id) => api.delete(`${resource}/${id}`);

export const completeTasks = (id, task) =>
  api.put(`${resource}/${id}/completed`, task);
