<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/useTaskStore";
const taskStore = useTaskStore();
const form = ref({
  id: null,
  name: "",
  is_completed: false,
});

const emit = defineEmits(["added"]);

const saveTask = () => {
  taskStore.add_task(form.value);
  close();
};

const close = () => {
  form.value = {
    id: null,
    name: "",
    is_completed: false,
  };
};
</script>
<template>
  <v-form @keydown.enter.prevent="saveTask">
    <v-text-field
      variant="outlined"
      prepend-inner-icon="mdi-plus"
      placeholder="Add Task . Click enter to save Task, Esc to clear Task"
      v-model="form.name"
      @keydown.esc="close"
    ></v-text-field>
  </v-form>
</template>
