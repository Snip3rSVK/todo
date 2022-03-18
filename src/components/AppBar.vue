<template>
  <v-app-bar
    density="comfortable"
    class="border-b bar pr-1"
    style="height: unset"
    flat
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click="store.commit('TOGGLE_NAV')"
      ></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title v-if="!searchMode" class="pl-2">
      {{ store.state.list.title }}
    </v-app-bar-title>

    <!-- Search -->
    <v-text-field
      v-if="searchMode"
      autofocus
      hide-details
      single-line
      persistent-placeholder
      type="search"
      placeholder="Search items"
      variant="plain"
      class="pt-0 pb-0 ml-1 mr-1"
    ></v-text-field>

    <!-- Close search -->
    <v-btn
      v-if="searchMode"
      @click="closeSearch()"
      variant="text"
      icon="mdi-close"
    ></v-btn>

    <!-- Open search -->
    <v-btn
      v-if="!searchMode"
      @click="openSearch()"
      variant="text"
      icon="mdi-magnify"
    ></v-btn>

    <!-- Filter -->
    <v-menu
      v-model="showFilter"
      transition="slide-y-transition"
      anchor="bottom end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          @click="closeOther()"
          variant="text"
          icon="mdi-tune-variant"
        ></v-btn>
      </template>
      <v-list class="popup elevation-1">
        <v-list-item @click="closeFilter()">
          <v-list-item-title>Not Completed</v-list-item-title>
        </v-list-item>
        <v-list-item @click="closeFilter()">
          <v-list-item-title>Completed</v-list-item-title>
        </v-list-item>
        <v-list-item @click="closeFilter()">
          <v-list-item-title>All items</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Other -->
    <v-menu
      v-model="showOther"
      :close-on-content-click="false"
      transition="slide-y-transition"
      anchor="bottom end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          @click="closeFilter()"
          variant="text"
          icon="mdi-dots-vertical"
        ></v-btn>
      </template>
      <v-list class="popup elevation-1">
        <v-list-item @click="editList()">
          <v-list-item-title>Edit list</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="removeList()"
          :disabled="store.state.list.id === '1'"
        >
          <v-list-item-title>Remove list</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { deepUnref } from "vue-deepunref";
import AddEditList from "./AddEditList.vue";

const router = useRouter();
const store = useStore();

const searchMode = ref(false);

const showFilter = ref(false);
const showOther = ref(false);

// This is fix for not closing popup after selecting item (Vuetify is in beta)
function closeFilter() {
  showFilter.value = false;
}

function closeOther() {
  showOther.value = false;
}

function openSearch() {
  searchMode.value = true;
}

function closeSearch() {
  searchMode.value = false;
}

function editList() {
  closeOther();

  store.commit("OPEN_MODAL", {
    component: AddEditList,
    componentProps: {
      id: store.state.list.id,
      title: store.state.list.title,
    },
  });
}

async function removeList() {
  closeOther();

  const id: string = store.state.list.id;
  const nextId: string = store.getters.getNextListId(id) || "1";

  await store.dispatch("removeList", deepUnref(store.state.list));

  // Forward to next list
  router.push({ name: "lists", params: { id: nextId } });
}
</script>

<style>
.bar .v-field__field {
  --v-field-padding-start: 4px;
  padding-top: 1px;
  padding-bottom: 0;
  font-size: 1.25rem;
}

.popup {
  margin-top: 5px;
}
</style>
