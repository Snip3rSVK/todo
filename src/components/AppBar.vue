<template>
  <v-app-bar
    density="comfortable"
    class="border-b bar"
    style="height: unset"
    flat
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click="store.commit('TOGGLE_NAV')"
      ></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ store.state.list.title }}</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" icon="mdi-magnify"></v-btn>
    <v-btn variant="text" icon="mdi-tune-variant"></v-btn>
    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();
</script>
