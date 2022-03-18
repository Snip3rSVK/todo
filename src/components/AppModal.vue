<template>
  <v-dialog v-model="opened" style="z-index: 2010">
    <component
      :is="store.state.modal.component"
      v-bind="store.state.modal.componentProps"
    ></component>
  </v-dialog>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";

const store = useStore();

const opened = computed({
  get: () => store.state.modal.opened,
  set: (value: boolean) => store.commit("SET_MODAL", value),
});
</script>
