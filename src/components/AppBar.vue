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

    <v-app-bar-title v-if="!searchMode" class="pl-2">Skuska {{ store.state.list.title }}</v-app-bar-title>

    <!-- KeepAlive -->
    <v-text-field
      v-if="searchMode"
      autofocus
      hide-details
      single-line
      type="search"
      placeholder="Search items"
      variant="plain"
      class="pt-0 pb-0 ml-1 mr-1"
    ></v-text-field>
    <v-btn
      v-if="searchMode"
      @click="closeSearch()"
      variant="text"
      icon="mdi-close"
    ></v-btn>

    <v-btn
      v-if="!searchMode"
      @click="openSearch()"
      variant="text"
      icon="mdi-magnify"
    ></v-btn>
    <v-btn variant="text" icon="mdi-tune-variant"></v-btn>
    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";

const store = useStore();

const searchMode = ref(false);

function openSearch() {
  searchMode.value = true;
}

function closeSearch() {
  searchMode.value = false;
}
</script>

<style>
.bar .v-field__field {
  --v-field-padding-start: 4px;
  padding-top: 1px;
  padding-bottom: 0;
  font-size: 1.25rem;
}
</style>
