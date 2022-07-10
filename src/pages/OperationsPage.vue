<template>
  <q-page class="col full-width">
    <OperationAddingComponent class="q-mt-md" />
    <OperationsTableComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OperationAddingComponent from 'components/OperationAddingComponent.vue';
import OperationsTableComponent from 'components/OperationsTableComponent.vue';

export default defineComponent({
  name: 'OperationsPage',
  components: {
    OperationAddingComponent,
    OperationsTableComponent,
  },
  setup() {
    return {};
  },
});
</script>
