<script setup>
import { computed, onMounted, ref } from "vue";
const form = ref({
  id: null,
  name: "",
  is_completed: false,
});
const tempName = ref(null);

const emit = defineEmits(["added"]);

const saveTask = () => {
  form.value.id = null;
  form.value.name = tempName.value;
  tempName.value = null;
  emit("added", form.value);
};
</script>
<template>
  <v-text-field
    variant="outlined"
    prepend-inner-icon="mdi-plus"
    placeholder="Add Task . Click enter to save Task, Esc to clear Task"
    v-model="tempName"
    @keydown.esc="close"
    @keydown.enter="saveTask"
  ></v-text-field>
</template>
