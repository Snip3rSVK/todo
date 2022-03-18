<template>
  <v-form v-model="valid" ref="formRef">
    <v-card class="card overflow-y-auto">
      <v-progress-linear
        v-visible="loading"
        height="2"
        indeterminate
      ></v-progress-linear>

      <v-card-header class="pt-3 pr-5 pb-0 pl-5">
        <v-card-header-text>
          <v-card-title v-if="editMode">Edit item</v-card-title>
          <v-card-title v-else>Add new item</v-card-title>
        </v-card-header-text>
      </v-card-header>
      <div class="pa-4 pb-0">
        <v-text-field
          v-model="form.title"
          :rules="[rules.required]"
          label="Title"
          hide-details
          class="mb-5"
        ></v-text-field>
        <v-textarea
          v-model="form.description"
          label="Description"
          class="mb-0"
        ></v-textarea>
        <v-text-field
          v-model="form.date"
          :rules="[rules.dateCorrect]"
          label="Date"
          type="datetime-local"
          class="mb-0"
        ></v-text-field>
      </div>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn @click="close()" variant="text">Cancel</v-btn>
        <v-btn @click="submit()" :disabled="loading" variant="text">
          {{ editMode ? "Edit" : "Add" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { deepUnref } from "vue-deepunref";
import { useStore } from "@/store";
import { isDate } from "@/utils/Date";
import type { ItemApi } from "@/types";

interface Props {
  item?: ItemApi;
}

const props = defineProps<Props>();
const store = useStore();

const formRef = ref(null);
const valid = ref(false);

const form = reactive(deepUnref(props.item) || ({} as ItemApi));

const editMode = computed(() => Boolean(props.item?.id));
const loading = ref(false);

const rules = reactive({
  required: (value: string) => Boolean(value) || "Required",
  dateCorrect: (value: string) => !value || isDate(value) || "Date is invalid",
});

async function submit() {
  await formRef.value.validate();

  if (valid.value) {
    loading.value = true;

    const formRaw = deepUnref(form);
    if (props.item?.id) {
      await store.dispatch("list/editItem", formRaw);
    } else {
      await store.dispatch("list/addItem", formRaw);
    }
    loading.value = false;
    close();
  }
}

function close() {
  store.commit("CLOSE_MODAL");
}
</script>

<style scoped>
.v-card-actions {
  min-height: unset;
}

.card {
  max-height: 100vh;
}
</style>
