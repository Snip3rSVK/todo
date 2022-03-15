<template>
  <v-app>
    <app-nav></app-nav>
    <app-bar></app-bar>
    <v-main style="margin-top: 1px">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import { useStore } from "@/store";
import AppBar from "@/components/AppBar.vue";
import AppNav from "@/components/AppNav.vue";

const store = useStore();
store.dispatch("getLists");
</script>

<style></style>
