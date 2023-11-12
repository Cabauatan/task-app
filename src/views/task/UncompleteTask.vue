<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/useTaskStore";
const taskStore = useTaskStore();
defineProps({ task: Object });
const is_edit = ref(false);
const saveTask = (task) => {
  taskStore.update_task(task.id, task);

  is_edit.value = false;
};
const updateTask = (task) => {
  task.is_completed = true;
  taskStore.complete_task(task.id, task);
  is_edit.value = false;
};
</script>
<template>
  <v-list-item variant="outlined">
    <v-list-item-title>
      <v-row>
        <v-col cols="12" md="6" align="right" v-if="!is_edit">
          <v-list-item-action start>
            <v-checkbox-btn
              v-model="task.is_completed"
              :label="!is_edit ? task.name : ''"
              @click="updateTask(task)"
            ></v-checkbox-btn>
          </v-list-item-action>
        </v-col>
        <v-col cols="12" md="6" class="mt-2" v-else>
          <v-text-field
            variant="outlined"
            type="text"
            v-model="task.name"
            @keydown.enter="saveTask(task)"
            @keydown.esc="is_edit = false"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" align="right">
          <v-icon
            size="small"
            style="padding: 20px"
            @click="is_edit = !is_edit"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            style="padding: 20px"
            @click="taskStore.delete_task(task.id)"
            >mdi-delete</v-icon
          >
        </v-col>
      </v-row>
    </v-list-item-title>
  </v-list-item>
</template>

<style></style>
