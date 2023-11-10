<script setup>
import { computed, onMounted, ref } from "vue";
const emit = defineEmits(["added"], ["update"], ["delete"]);
defineProps({ task: Object });
const saveTask = (task) => {
  emit("added", task);
};
const updateTask = (task) => {
  task.is_completed = true;
  emit("update", task);
};
const deleteTask = (task) => {
  task.is_completed = true;
  emit("delete", task);
};

const Vfocus = {
  mounted: (el) => el.focus(),
};
const is_edit = ref(false);
</script>
<template>
  <h5
    align="center"
    style="margin-top: -10px; padding-bottom: 10px; text-decoration: solid"
  ></h5>
  <v-list-item variant="outlined">
    <template v-slot:prepend="">
      <v-list-item-action start>
        <v-checkbox-btn
          v-model="task.is_completed"
          @click="updateTask(task)"
        ></v-checkbox-btn>
      </v-list-item-action>
    </template>
    <v-list-item-title>
      <v-row>
        <v-col cols="12" md="6" class="mt-2" v-if="!is_edit">
          <p>{{ task.name }}</p>
        </v-col>
        <v-col cols="12" md="6" class="mt-2" v-if="is_edit">
          <v-text-field
            variant="outlined"
            type="text"
            v-model="task.name"
            @keydown.enter="saveTask(task)"
            @keydown.esc="is_edit = !is_edit"
            v-focus
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" align="right">
          <v-icon size="small" style="padding: 20px" @click="is_edit = !is_edit"
            >mdi-pencil</v-icon
          >
          <v-icon size="small" style="padding: 20px" @click="deleteTask(task)"
            >mdi-delete</v-icon
          >
        </v-col>
      </v-row>
    </v-list-item-title>
  </v-list-item>
</template>

<style></style>
