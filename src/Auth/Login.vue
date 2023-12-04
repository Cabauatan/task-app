<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import NavBar from "@/components/layout/NavBar.vue";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: null,
  password: null,
});

const checkLogin = async () => {
  // console.log(form);
  await auth.handleLogin(form);
  router.push("/task");
};
</script>
<template>
  <NavBar />
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" align="center">
        <v-form validate-on="submit" @submit.prevent="checkLogin">
          <v-text-field
            variant="outlined"
            prepend-inner-icon="mdi-account"
            placeholder="Enter valid e-mail address"
            v-model="form.email"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="password"
            prepend-inner-icon="mdi-account-key"
            placeholder="Enter your password"
            v-model="form.password"
          ></v-text-field>
          <v-btn type="submit"> Login </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
