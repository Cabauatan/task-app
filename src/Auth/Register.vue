<script setup>
import { reactive } from "vue";
import NavBar from "@/components/layout/NavBar.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();

const form = reactive({
  name: null,
  email: null,
  password: null,
});
const save = async () => {
  // router.push({ name: Home });
  // console.log(form);
  await auth.handleRegister(form);
};
</script>
<template>
  <NavBar />
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" align="center">
        <v-form @submit.prevent="save">
          <v-text-field
            variant="outlined"
            prepend-inner-icon="mdi-pencil"
            placeholder="Enter your name"
            v-model="form.name"
          ></v-text-field>
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

          <v-btn type="submit"> Register </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
