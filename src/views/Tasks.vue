<script setup>
import { onMounted, ref } from "vue";

import UncompleteTask from "./task/UncompleteTask.vue";
import AddTask from "./task/AddTask.vue";
import CompleteTask from "./task/CompleteTask.vue";
import NavBar from "@/components/layout/NavBar.vue";

import { useTaskStore } from "@/stores/useTaskStore";

const taskStore = useTaskStore();
onMounted(() => {
  fetch();
});

const switchComplete = ref(false);
const loading = ref(true);

const fetch = async () => {
  loading.value = true;
  taskStore.get_allTask();
  loading.value = false;
};
</script>
<template>
  <NavBar />
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" md="11" sm="12">
        <AddTask />
      </v-col>

      <v-col cols="12" md="1" sm="12">
        <v-switch inset hide-details v-model="switchComplete"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <h5
          align="center"
          style="
            margin-top: -10px;
            padding-bottom: 10px;
            text-decoration: solid;
          "
        >
          <p
            style="font-style: italic"
            v-if="!taskStore.get_uncomplete.length > 0 && !loading"
          >
            No Task
          </p>
        </h5>
        <UncompleteTask
          v-for="item in taskStore.get_uncomplete"
          :task="item"
          :key="item.id"
        />
      </v-col>
    </v-row>
    <v-row v-if="switchComplete">
      <v-col cols="12" md="12" sm="12">
        <h5
          align="center"
          style="
            margin-top: -10px;
            padding-bottom: 10px;
            text-decoration: solid;
          "
        >
          <p
            style="font-style: italic"
            v-if="!taskStore.get_complete.length > 0"
          >
            No Completed Task
          </p>
          <p style="font-size: large" v-if="taskStore.get_complete.length > 0">
            Completed Task
          </p>
        </h5>
        <CompleteTask
          v-for="item in taskStore.get_complete"
          :task="item"
          :key="item.id"
          @delete="deleteTask"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
