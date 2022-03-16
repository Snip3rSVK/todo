<template>
  <v-app>
    <app-nav></app-nav>
    <app-bar></app-bar>

    <v-main class="main">
      <router-view />
    </v-main>

    <app-modal></app-modal>
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
import AppModal from "@/components/AppModal.vue";

const store = useStore();
store.dispatch("getLists");
</script>

<style>
.main {
  margin-top: 1px;
}
</style>
