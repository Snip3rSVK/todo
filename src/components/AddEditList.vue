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
          <v-card-title v-if="editMode">Edit list</v-card-title>
          <v-card-title v-else>Add new list</v-card-title>
        </v-card-header-text>
      </v-card-header>
      <div class="pa-4 pb-0">
        <v-text-field
          v-model="title"
          :rules="[rules.required]"
          label="List name"
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
import { useStore } from "@/store";

interface Props {
  id?: string;
  title?: string;
}

const props = defineProps<Props>();
const store = useStore();

const formRef = ref(null);
const valid = ref(false);

const editMode = computed(() => Boolean(props.id));
const title = ref(props.title);

const loading = ref(false);

const rules = reactive({
  required: (value: string) => Boolean(value) || "Required",
});

async function submit() {
  await formRef.value.validate();

  if (valid.value) {
    loading.value = true;

    if (editMode.value) {
      await store.dispatch("editList", { id: props.id, title: title.value });
    } else {
      await store.dispatch("addList", title.value);
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
