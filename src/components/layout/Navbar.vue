<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();

const is_login = ref(false);
const dialog = ref(false);

const AuthLogin = async (isRegisterClick = false) => {
  if (isRegisterClick) {
    router.push({ name: "login" });
  }
  is_login.value = !is_login.value;
};
const AuthLogout = async () => {
  authStore.handleLogout();
  router.push({ name: "login" });
};
const ListTask = () => {
  router.push({ name: "task" });
};
</script>

<template>
  <v-card>
    <v-container>
      <Login :dialog="dialog" />
      <v-row>
        <v-col cols="12" md="6">
          <h2>
            {{}} Task<b>List</b>
            <v-btn @click="ListTask" variant="plain">Tasks</v-btn>
            <v-btn variant="plain">Summary</v-btn>
          </h2>
        </v-col>
        <v-col cols="12" md="6" align="end">
          <v-btn
            style="background-color: green; margin-left: 5px"
            v-if="!authStore.isLoggedIn"
            @click="AuthLogin"
          >
            Login
          </v-btn>
          <v-btn
            href="register"
            style="background-color: blue; margin-left: 5px"
            v-if="!authStore.isLoggedIn"
          >
            Register
          </v-btn>
          <v-btn
            style="background-color: red; margin-left: 5px"
            v-if="authStore.isLoggedIn"
            @click="AuthLogout()"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
