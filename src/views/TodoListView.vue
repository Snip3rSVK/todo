<template>
  <v-list density="compact">
    <v-list-item color="primary">
      <v-list-item-avatar left>
        <v-icon color="primary" icon="mdi-plus-circle-outline"></v-icon>
      </v-list-item-avatar>
      <v-list-item-title>Add new item</v-list-item-title>
    </v-list-item>
  </v-list>

  <!-- <v-menu transition="slide-y-transition" v-model="showMenu" bottom>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" dark v-bind="props">Dropdown</v-btn>
    </template>
    <v-list>
      <v-list-item @click="showMenu = !showMenu">
        <v-list-item-title>hello</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu> -->

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

const store = useStore();
const route = useRoute();

watch(
  () => route.params.id,
  async (newId) => {
    store.dispatch("list/getListDetail", newId);
  }
);

store.dispatch("list/getListDetail", route.params.id);
</script>
