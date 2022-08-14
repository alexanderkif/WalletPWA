<template>
  <div
    class="record-totals row full-screen justify-start items-start q-gutter-md"
  >
    <q-card
      v-for="wt in walletTotals"
      :key="wt.wallet"
      class="total-card"
      :class="
        $q.dark.isActive
          ? wt.total && wt.total < 0
            ? 'total-card--dark_negative'
            : 'total-card--dark'
          : wt.total && wt.total < 0
          ? 'total-card_negative'
          : 'total-card'
      "
    >
      <q-card-section class="q-py-sm">
        <div class="text-center text-subtitle2">{{ wt.wallet }}</div>
        <div class="text-center text-subtitle2">{{ wt.total }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useWalletsStore } from 'src/stores/wallets-store';
import { useRecordStore } from 'src/stores/records-store';

export default defineComponent({
  name: 'TotalComponent',
  setup() {
    const walletsStore = useWalletsStore();
    const recordStore = useRecordStore();

    const walletTotals = computed(() =>
      walletsStore.getWallets.map((w) => ({
        wallet: w.label,
        total: recordStore.getRecords
          .map((r) => r.money)
          .reduce((acc, el) => (el ? [...acc, ...el] : acc), [])
          .filter((r) => r.wallet === w.label)
          .reduce((acc, r) => {
            if (r.income) acc += r.income;
            if (r.expense) acc -= r.expense;
            return acc;
          }, 0),
      }))
    );

    return {
      walletsStore,
      recordStore,
      walletTotals,
    };
  },
});
</script>

<style lang="scss">
.record-totals {
  .total-card {
    max-width: 250px;
    background-color: rgb(222, 255, 222);

    &_negative {
      background-color: rgb(255, 222, 222);
    }
  }
  .total-card--dark {
    max-width: 250px;
    background-color: rgb(0, 73, 0);

    &_negative {
      background-color: rgb(73, 0, 0);
    }
  }
}
</style>
