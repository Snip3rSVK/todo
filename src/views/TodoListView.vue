<template>
  <v-progress-linear
    v-visible="loading"
    height="1"
    class="progress-bar-thin"
    indeterminate
  ></v-progress-linear>

  <v-list density="compact">
    <v-list-item @click="addItem()" active-class="hide-active" color="primary">
      <v-list-item-avatar left>
        <v-icon icon="mdi-plus-circle-outline"></v-icon>
      </v-list-item-avatar>
      <v-list-item-title>Add new item</v-list-item-title>
    </v-list-item>
  </v-list>

  <div class="list-items-wrapper">
    <list-item
      v-for="item in reversedFilteredItems"
      :key="item.id"
      :item="item"
    ></list-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "TodoListView",
});
</script>

<script setup lang="ts">
import ListItem from "@/components/TodoListItem.vue";
import { watch, ref } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import AddEditListItem from "@/components/AddEditListItem.vue";
import type { ItemApi } from "@/types";

const route = useRoute();
const store = useStore();
const loading = ref(false);

// getFilteredItems
const reversedFilteredItems = computed<ItemApi[]>(() =>
  store.getters["list/getFilteredItems"].slice().reverse()
);

watch(() => route.params.id, onStart);
onMounted(onStart);

async function onStart() {
  loading.value = true;

  await store.dispatch("list/getListDetail", route.params.id);
  store.commit("list/CLEAR_FILTER");

  loading.value = false;
}

function addItem() {
  store.commit("OPEN_MODAL", {
    component: AddEditListItem,
    componentProps: {
      item: {
        listId: store.state.list.id || route.params.id,
      },
    },
  });
}
</script>
