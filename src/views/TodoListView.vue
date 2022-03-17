<template>
  <v-list density="compact">
    <v-list-item active-class="hide-active" color="primary" @click="addItem()">
      <v-list-item-avatar left>
        <v-icon icon="mdi-plus-circle-outline"></v-icon>
      </v-list-item-avatar>
      <v-list-item-title>Add new item</v-list-item-title>
    </v-list-item>
  </v-list>

  <div class="list-items-wrapper">
    <list-item
      v-for="item in store.state.list.items"
      :key="item.id"
      :item="item"
    ></list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoListView",
});
</script>

<script setup lang="ts">
import ListItem from "@/components/TodoListItem.vue";
import { watch } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import AddEditListItem from "@/components/AddEditListItem.vue";

const store = useStore();
const route = useRoute();

watch(
  () => route.params.id,
  async (newId) => {
    store.dispatch("list/getListDetail", newId);
  }
);

store.dispatch("list/getListDetail", route.params.id);

function addItem() {
  store.commit("OPEN_MODAL", {
    component: AddEditListItem,
    componentProps: {
      item: {
        listId: store.state.list.id,
      },
    },
  });
}
</script>
