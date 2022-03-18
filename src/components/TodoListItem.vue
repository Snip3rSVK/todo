<template>
  <div class="d-flex list-item pt-1 pb-2">
    <div class="list-item-overlay"></div>

    <div class="list-item-checkbox pr-2">
      <v-checkbox
        v-model="active"
        color="primary"
        false-icon="mdi-checkbox-blank-circle-outline"
        true-icon="mdi-check"
        density="comfortable"
        direction="vertical"
        hide-details
      ></v-checkbox>
    </div>

    <div class="flex-grow-1 pt-1 text-truncate">
      <div
        class="list-item-title text-truncate"
        :class="{ 'text-decoration-line-through': props.item.active }"
      >
        {{ props.item.title }}
      </div>
      <pre
        v-if="props.item.description"
        class="list-item-subtitle text-caption text-medium-emphasis"
      >
        {{ props.item.description }}
      </pre>
      <v-chip
        v-if="props.item.date"
        size="small"
        variant="outlined"
        class="border pt-2 pb-2 pl-3 pr-3 mt-1"
      >
        {{ formattedDate }}
      </v-chip>
    </div>

    <div class="list-item-options">
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
            density="comfortable"
            variant="text"
            icon="mdi-dots-vertical"
          ></v-btn>
        </template>
        <v-list class="popup elevation-1">
          <v-list-item @click="editItem()">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="removeItem()">
            <v-list-item-title>Remove</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import type { ItemApi } from "@/types";
import { formatDate } from "@/utils/Date";
import { computed, ref } from "vue";
import AddEditListItem from "./AddEditListItem.vue";

// The ItemApi interface could be used instead, but it doesnt work in definedProps in the current vue version
interface Props {
  item: ItemApi;
}

const props = defineProps<Props>();
const store = useStore();

const showOther = ref(false);

const active = computed({
  get: () => props.item.active,
  set: (active: boolean) => {
    return store.dispatch("list/updateItemStatus", {
      item: props.item,
      active,
    });
  },
});
const formattedDate = computed(() => formatDate(props.item.date));

function closePopup() {
  showOther.value = false;
}

function editItem() {
  closePopup();

  store.commit("OPEN_MODAL", {
    component: AddEditListItem,
    componentProps: {
      item: props.item,
    },
  });
}

async function removeItem() {
  closePopup();

  await store.dispatch("list/removeItem", props.item);
}
</script>

<style scoped>
.list-item {
  position: relative;
}

.list-item-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: currentColor;
  opacity: 0;
}

.list-item:hover .list-item-overlay {
  opacity: calc(0.04 * var(--v-theme-overlay-multiplier));
}

.list-item-checkbox {
  padding-left: 10px;
}

.list-item-options {
  padding-right: 10px;
  margin-top: -1px;
}

.list-item-subtitle {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
}
</style>
