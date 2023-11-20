<script setup>
import NavBar from "@/components/layout/NavBar.vue";
</script>
<template>
  <NavBar />
  <v-container class="w-50">
    <v-row>
      <v-col cols="12" align="center">
        <v-form @submit.prevent="">
          <v-text-field
            variant="outlined"
            prepend-inner-icon="mdi-pencil"
            placeholder="Enter your name"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            prepend-inner-icon="mdi-account"
            placeholder="Enter valid e-mail address"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="password"
            prepend-inner-icon="mdi-account-key"
            placeholder="Enter your password"
          ></v-text-field>

          <v-btn type="submit"> Login </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
