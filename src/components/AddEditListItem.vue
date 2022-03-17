<template>
  <v-form v-model="valid" ref="formRef">
    <v-card class="card overflow-y-auto">
      <v-card-header class="pt-4 pr-5 pb-0 pl-5">
        <v-card-header-text>
          <v-card-title>Add new item</v-card-title>
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
        <v-btn @click="submit()" variant="text">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
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

const form = toRefs(props.item || ({} as ItemApi));

const rules = reactive({
  required: (value: string) => Boolean(value) || "Required",
  dateCorrect: (value: string) => !value || isDate(value) || "Date is invalid",
});

async function submit() {
  await formRef.value.validate();

  if (valid.value) {
    await store.dispatch("list/addItem", form);
    close();
  }
  console.log(form);
  // await store.dispatch("addList", title.value);
  // close();
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
