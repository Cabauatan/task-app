import { defineStore } from "pinia";
import {
  allTasks,
  storeTasks,
  updateTasks,
  completeTasks,
  deleteTasks,
} from "@/http/apitask";
export const useTaskStore = defineStore("useTaskStore", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    get_taskAll: (state) => state.tasks,
    get_uncomplete: (state) =>
      state.tasks.filter((tasks) => !tasks.is_completed),
    get_complete: (state) => state.tasks.filter((tasks) => tasks.is_completed),
  },
  actions: {
    async get_allTask() {
      const { data } = await allTasks();
      this.$state.tasks = data.data;
    },
    async add_task(data) {
      const res = await storeTasks(data);
      this.get_allTask();
    },
    async update_task(id, data) {
      const res = await updateTasks(id, data);
      this.get_allTask();
    },
    async complete_task(id, data) {
      const res = await completeTasks(id, data);
      this.get_allTask();
    },
    async delete_task(id) {
      const res = await deleteTasks(id);
      this.get_allTask();
    },
  },
});
