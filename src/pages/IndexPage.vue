<template>
  <q-page class="column full-width">
    <RecordAddingComponent class="col-auto q-mt-md" />
    <TotalComponent
      v-if="commonStore.getShowTotalOnRecords"
      class="col-auto q-px-md q-mt-none"
    />
    <RecordsTableComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RecordAddingComponent from 'components/RecordAddingComponent.vue';
import RecordsTableComponent from 'components/RecordsTableComponent.vue';
import TotalComponent from 'components/TotalComponent.vue';
import { useWalletsStore } from 'src/stores/wallets-store';
import { useOperationsStore } from 'src/stores/operations-store';
import { useCommonStore } from 'src/stores/common-store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: {
    RecordAddingComponent,
    RecordsTableComponent,
    TotalComponent,
  },
  setup() {
    const walletsStore = useWalletsStore();
    const operationsStore = useOperationsStore();
    const commonStore = useCommonStore();
    const router = useRouter();

    if (!walletsStore.getWallets.length) router.push('/wallets');
    else if (!operationsStore.getOperations.length) router.push('/operations');

    return {
      commonStore,
    };
  },
});
</script>
