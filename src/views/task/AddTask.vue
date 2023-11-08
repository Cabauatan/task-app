<script setup>
import { computed, onMounted, ref } from "vue";
const form = ref({
  name: "",
  is_completed: false,
});

const emit = defineEmits(["added"]);

const saveTask = () => {
  form.name = "";
  emit("added", form.value);
};
</script>
<template>
  <v-text-field
    variant="outlined"
    prepend-inner-icon="mdi-plus"
    placeholder="Add Task . Click enter to save Task, Esc to clear Task"
    v-model="form.name"
    @keydown.esc="close"
    @keydown.enter="saveTask"
  ></v-text-field>
</template>
