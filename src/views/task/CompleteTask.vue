<script setup>
import { computed, onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/useTaskStore";
const emit = defineEmits(["delete"]);
defineProps({ task: Object });

const taskStore = useTaskStore();
</script>
<template>
  <h5
    align="center"
    style="margin-top: -10px; padding-bottom: 10px; text-decoration: solid"
  ></h5>
  <v-list-item variant="outlined">
    <v-list-item-title>
      <v-row>
        <v-col cols="12" md="6" align="right">
          <v-list-item-action start>
            <v-checkbox-btn
              v-model="task.is_completed"
              :label="task.name"
              disabled
            ></v-checkbox-btn>
          </v-list-item-action>
        </v-col>
        <v-col cols="12" md="6" align="right">
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

<style scoped>
.taskCompleted {
  text-decoration: line-through;
}
</style>
