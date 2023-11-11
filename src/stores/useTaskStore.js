import { ref, computed } from "vue";
import { defineStore } from "pinia";

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
    async set_task(res) {
      this.$state.tasks = res;
    },
  },
});
