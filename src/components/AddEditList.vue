<template>
  <v-card class="card overflow-y-auto">
    <v-card-header class="pt-4 pr-5 pb-0 pl-5">
      <v-card-header-text>
        <v-card-title>Add new list</v-card-title>
      </v-card-header-text>
    </v-card-header>

    <div class="pa-4 pb-0">
      <v-text-field
        label="List name"
        v-model="text"
        class="mb-0"
      ></v-text-field>
    </div>

    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn @click="close()" variant="text">Cancel</v-btn>
      <v-btn @click="addList()" variant="text">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";

interface Props {
  text: string;
}

const props = defineProps<Props>();
const store = useStore();

const text = ref(props.text);

async function addList() {
  await store.dispatch("addList", text.value);
  close();
}

function close() {
  store.commit("CLOSE_MODAL");
}
</script>

<style scoped>
.v-card-actions {
  min-height: unset;
}

.card {
  max-height: 100vh;
}
</style>
