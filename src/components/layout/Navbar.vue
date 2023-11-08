<script setup>
import { computed, onMounted, ref } from "vue";
import {
  allTasks,
  storeTasks,
  updateTasks,
  completeTasks,
  deleteTasks,
} from "@/http/apitask";
import UncompleteTask from "@/views/task/UncompleteTask.vue";
import AddTask from "@/views/task/AddTask.vue";

onMounted(() => {
  fetch();
});
const completedTasks = ref([]);
const uncompletedTasks = ref([]);
const switchComplete = ref(false);
const editClick = ref(false);
const is_login = ref(false);

const form = ref({
  id: "",
  name: "",
  is_completed: false,
});

const fetch = async () => {
  completedTasks.value = [];
  uncompletedTasks.value = [];
  const { data } = await allTasks();
  data.data.filter(taskcomplete);
  function taskcomplete(task) {
    task.is_completed
      ? completedTasks.value.push(task)
      : uncompletedTasks.value.push(task);
  }
};

const saveTask = async (cat = null) => {
  form.value = cat != null ? cat : form.value;
  if (!editClick.value) {
    const res = await storeTasks(form.value);
    //console.log(res);
  } else {
    const res = await updateTasks(form.value.id, form.value);
    //console.log(res);
  }
  editClick.value = false;
  fetch();
  close();
};
function close() {
  form.value.id = "";
  form.value.name = "";
  form.value.is_completed = false;
}
const iscomplete = (items) => {
  return items ? "taskCompleted" : "";
};
const editItem = (items) => {
  editClick.value = true;
  console.log(items);
  form.value.id = items.id;
  form.value.name = items.name;
};
const completeTask = async (id) => {
  form.value.is_completed = true;
  const res = await completeTasks(id, form.value);
  //console.log(res);
  close();
  fetch();
};
const deleteTask = async (id) => {
  form.value.is_completed = true;
  const res = await deleteTasks(id);
  console.log(res);
  close();
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
  <UncompleteTask :task="uncompletedTasks" /><!--  Giving Data to new -->
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" md="11" sm="12">
        <AddTask @added="saveTask" />
        <!-- {{ form }} -->
        <!-- <v-text-field
          variant="outlined"
          prepend-inner-icon="mdi-plus"
          placeholder="Add Task . Click enter to save Task, Esc to clear Task"
          v-model="form.name"
          @keydown.esc="close"
          @keydown.enter="saveTask"
        ></v-text-field> -->
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
          <p style="font-style: italic" v-if="!uncompletedTasks.length > 0">
            No Available Task
          </p>
        </h5>
        <v-list-item
          v-for="(items, index) in uncompletedTasks"
          :key="index"
          variant="outlined"
        >
          <template v-slot:prepend="{}">
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="items.is_completed"
                @click="completeTask(items.id)"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title :class="iscomplete(items.is_completed)">
            <v-row>
              <v-col cols="12" md="6" class="mt-2">
                <p>{{ items.name }} || {{ items.is_completed }}</p>
              </v-col>
              <v-col cols="12" md="6" align="right">
                <v-icon
                  size="small"
                  style="padding: 20px"
                  @click="editItem(items)"
                  >mdi-pencil</v-icon
                >
                <v-icon
                  size="small"
                  style="padding: 20px"
                  @click="deleteTask(items.id)"
                  >mdi-delete</v-icon
                >
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item>
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
          <p style="font-style: italic" v-if="!completedTasks.length > 0">
            No Completed Task
          </p>
          <p style="font-size: large" v-if="completedTasks.length > 0">
            Completed Task
          </p>
        </h5>

        <v-list-item
          v-for="(items, index) in completedTasks"
          :key="index"
          variant="outlined"
        >
          <template v-slot:prepend="{}">
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="items.is_completed"
                :disabled="items.is_completed"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title :class="iscomplete(items.is_completed)">
            <v-row>
              <v-col cols="12" md="6" class="mt-2">
                {{ items.name }} | {{ items.is_completed }}
              </v-col>
              <v-col cols="12" md="6" align="right">
                <v-icon
                  size="small"
                  style="padding: 20px"
                  @click="deleteTask(items.id)"
                  >mdi-delete</v-icon
                >
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.taskCompleted {
  text-decoration: line-through;
}
</style>
