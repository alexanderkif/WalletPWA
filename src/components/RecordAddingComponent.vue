<template>
  <div class="q-px-md full-width">
    <q-btn
      color="positive"
      icon="add"
      glossy
      label="Add record"
      @click="openAddRecordDialog"
    />
    <RecordDialogComponent ref="recordDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RecordDialogComponent from 'components/RecordDialogComponent.vue';

export default defineComponent({
  name: 'RecordAddingComponent',
  components: {
    RecordDialogComponent,
  },
  setup() {
    const recordDialog = ref();

    async function openAddRecordDialog() {
      recordDialog.value.openAddRecordDialog();
    }

    return {
      openAddRecordDialog,
      recordDialog,
    };
  },
});
</script>
