<template>
  <v-navigation-drawer v-model="navOpened">
    <v-list density="compact" class="border-b list-header">
      <v-list-item title="Todo App" class="pr-2">
        <template v-if="$vuetify.display.mobile" v-slot:append>
          <v-list-item-avatar @click="store.commit('SET_NAV', false)">
            <v-btn
              density="comfortable"
              variant="text"
              icon="mdi-close"
            ></v-btn>
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-list>

    <v-list density="compact" nav>
      <v-list-item
        :key="id"
        v-for="{ id, title } in store.state.lists"
        :to="'/lists/' + id"
      >
        <v-list-item-avatar left>
          <v-icon icon="mdi-format-list-bulleted"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item>

      <v-list-item color="primary" @click="addList()">
        <v-list-item-avatar left>
          <v-icon color="primary" icon="mdi-plus"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Add new list</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import AddEditList from "./AddEditList.vue";

const store = useStore();

const navOpened = computed({
  get: () => store.state.navOpened,
  set: (value: boolean) => store.commit("SET_NAV", value),
});

function addList() {
  store.commit("OPEN_MODAL", {
    component: AddEditList,
  });
}
</script>
