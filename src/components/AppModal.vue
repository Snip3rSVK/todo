<template>
  <v-dialog v-model="store.state.modal.opened" style="z-index: 1010">
    <component
      :is="store.state.modal.component"
      v-bind="store.state.modal.componentProps"
    ></component>
  </v-dialog>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();
</script>
