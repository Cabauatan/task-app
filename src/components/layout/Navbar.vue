<script setup>
import { onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/useTaskStore";
import {
  allTasks,
  storeTasks,
  updateTasks,
  completeTasks,
  deleteTasks,
} from "@/http/apitask";
import UncompleteTask from "@/views/task/UncompleteTask.vue";
import AddTask from "@/views/task/AddTask.vue";
import CompleteTask from "@/views/task/CompleteTask.vue";

const taskStore = useTaskStore();

onMounted(() => {
  fetch();
});
const switchComplete = ref(false);
const editClick = ref(false);
const loading = ref(true);
const is_login = ref(false);

const fetch = async () => {
  loading.value = true;
  const { data } = await allTasks();

  taskStore.set_task(data.data);

  console.log(taskStore.get_complete_count);
  console.log(taskStore.get_uncomplete_count);

  loading.value = false;
};

const saveTask = async (cat) => {
  if (cat.id != null) {
    const res = await updateTasks(cat.id, cat);

    //console.log(res);
  } else {
    const res = await storeTasks(cat);
    console.log(res);
  }
  editClick.value = false;
  fetch();
};
const completeTask = async (cat) => {
  const res = await completeTasks(cat.id, cat);
  //console.log(res);
  fetch();
};
const deleteTask = async (cat) => {
  const res = await deleteTasks(cat.id);
  // console.log(res);
  fetch();
};
const AuthLogin = async (isRegisterClick = false) => {
  is_login.value = !is_login.value;
};
</script>

<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h2>
            Task<b>List</b>
            <v-btn variant="plain">Tasks</v-btn>
            <v-btn variant="plain">Summary</v-btn>
          </h2>
        </v-col>
        <v-col cols="12" md="6" align="end">
          <v-btn
            style="background-color: green; margin-left: 5px"
            v-if="!is_login"
            @click="AuthLogin"
          >
            Login
          </v-btn>
          <v-btn
            style="background-color: blue; margin-left: 5px"
            v-if="!is_login"
            @click="AuthLogin(true)"
          >
            Register
          </v-btn>
          <v-btn
            style="background-color: red; margin-left: 5px"
            v-if="is_login"
            @click="AuthLogin"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" md="11" sm="12">
        <AddTask @added="saveTask" />
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
          <v-progress-circular
            :indeterminate="loading"
            v-if="loading"
          ></v-progress-circular>
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
          @added="saveTask"
          @update="completeTask"
          @delete="deleteTask"
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
