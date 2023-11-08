<script setup>
defineProps({ task: Object });
</script>
<template>
  <h5
    align="center"
    style="margin-top: -10px; padding-bottom: 10px; text-decoration: solid"
  ></h5>
  <v-list-item variant="outlined">
    <template v-slot:prepend="{}">
      <v-list-item-action start>
        <v-checkbox-btn v-model="task.is_completed"></v-checkbox-btn>
      </v-list-item-action>
    </template>
    <v-list-item-title>
      <v-row>
        <v-col cols="12" md="6" class="mt-2">
          <p>{{ task.name }} || {{ task.is_completed }}</p>
        </v-col>
        <v-col cols="12" md="6" align="right">
          <v-icon size="small" style="padding: 20px" @click="editItem(task)"
            >mdi-pencil</v-icon
          >
          <v-icon
            size="small"
            style="padding: 20px"
            @click="deleteTask(task.id)"
            >mdi-delete</v-icon
          >
        </v-col>
      </v-row>
    </v-list-item-title>
  </v-list-item>
</template>

<style></style>
