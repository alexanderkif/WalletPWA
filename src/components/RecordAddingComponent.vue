<template>
  <div class="row justify-between q-px-md full-width">
    <q-btn
      color="positive"
      icon="add"
      glossy
      label="Add record"
      @click="openAddRecordDialog"
    />
    <q-checkbox
      v-model="showTotalOnRecords"
      label="Show Totals"
      color="positive"
      @update:model-value="changedShowTotalOnRecords"
    />
    <RecordDialogComponent ref="recordDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RecordDialogComponent from 'components/RecordDialogComponent.vue';
import { useCommonStore } from 'src/stores/common-store';

export default defineComponent({
  name: 'RecordAddingComponent',
  components: {
    RecordDialogComponent,
  },
  setup() {
    const commonStore = useCommonStore();

    const recordDialog = ref();
    const showTotalOnRecords = ref(commonStore.getShowTotalOnRecords);

    async function openAddRecordDialog() {
      recordDialog.value.openAddRecordDialog();
    }

    async function changedShowTotalOnRecords() {
      commonStore.setShowTotalOnRecords(showTotalOnRecords.value);
    }

    return {
      openAddRecordDialog,
      recordDialog,
      showTotalOnRecords,
      changedShowTotalOnRecords,
    };
  },
});
</script>
