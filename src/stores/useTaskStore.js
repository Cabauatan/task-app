import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("useTaskStore", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    get_taskAll: (state) => state.tasks,
    get_uncomplete() {
      return this.tasks.filter((tasks) => !tasks.is_completed);
    },
    get_complete() {
      return this.tasks.filter((tasks) => tasks.is_completed);
    },
    get_complete_count() {
      return this.get_complete.length;
    },
    get_uncomplete_count() {
      return this.get_uncomplete.length;
    },
  },
  actions: {
    async set_task(res) {
      this.$state.tasks = res;
    },
  },
});
