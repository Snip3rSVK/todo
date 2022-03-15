<template>
  <div class="d-flex list-item pt-1 pb-2">
    <div class="list-item-overlay"></div>

    <div class="list-item-checkbox pr-2">
      <!-- TODO v-model -->
      <v-checkbox
        v-model="props.active"
        color="primary"
        false-icon="mdi-checkbox-blank-circle-outline"
        true-icon="mdi-check"
        density="comfortable"
        direction="vertical"
        hide-details
      ></v-checkbox>
    </div>

    <div class="flex-grow-1 pt-1 text-truncate">
      <div class="list-item-title text-truncate">{{ props.title }}</div>
      <pre
        v-if="props.description"
        class="list-item-subtitle text-caption text-medium-emphasis"
      >
        {{ props.description }}
      </pre>
      <v-chip
        v-if="props.date"
        size="small"
        variant="outlined"
        class="border pt-2 pb-2 pl-3 pr-3 mt-1"
      >
        {{ date.toLocaleDateString("en-US") }}
      </v-chip>
    </div>

    <div class="list-item-options">
      <v-btn
        density="comfortable"
        variant="text"
        icon="mdi-dots-vertical"
        flat
      ></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// TODO maybe get interface from api and tranform to optional?
interface Item {
  id?: number;
  // listId: number;
  active: boolean;
  title: string;
  description?: string;
  date?: string;
}

const props = defineProps<Item>();

const date = computed(() => new Date(props.date || ""));
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
