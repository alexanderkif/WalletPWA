<template>
  <q-page class="column items-start justify-start">
    <div class="row full-width justify-end q-px-md">
      <q-checkbox v-model="showWallets" label="Show Wallets" color="positive" />
    </div>
    <div class="row q-px-md">
      <TotalComponent v-if="showWallets" class="q-mb-md" />
    </div>
    <div class="row justify-center items-start q-gutter-md q-px-md">
      <q-select
        outlined
        use-chips
        v-model="walletsToFilter"
        multiple
        :options="wallets"
        label="Filter Wallets"
        class="col"
        style="min-width: 150px"
      />
      <q-select
        outlined
        use-chips
        v-model="monthsToFilter"
        multiple
        :options="months"
        label="Months"
        class="col"
        style="min-width: 150px"
      />
      <q-select
        outlined
        use-chips
        v-model="categoriesToFilter"
        multiple
        :options="categories"
        label="Filter Categories"
        class="col"
        style="min-width: 150px"
      />
      <q-select
        outlined
        use-chips
        v-model="operationsToFilter"
        multiple
        :options="operations"
        label="Filter Operations"
        class="col"
        style="min-width: 150px"
      />
    </div>
    <div class="row full-width">
      <TotalTableComponent :totalColumns="columns" :totalRows="rows" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import TotalComponent from 'components/TotalComponent.vue';
import TotalTableComponent from 'components/TotalTableComponent.vue';
import { useWalletsStore } from 'src/stores/wallets-store';
import { useRecordStore } from 'src/stores/records-store';
import { useCategoriesStore } from 'src/stores/categories-store';
import { useOperationsStore } from 'src/stores/operations-store';
import { Operation, Wallet, Record } from 'src/components/models';
import { LocalStorage } from 'quasar';

export default defineComponent({
  name: 'WalletsTotal',
  components: {
    TotalComponent,
    TotalTableComponent,
  },
  setup() {
    const walletsStore = useWalletsStore();
    const recordStore = useRecordStore();
    const categoriesStore = useCategoriesStore();
    const operationsStore = useOperationsStore();
    const showWallets = ref(false);

    const walletsToFilter = ref<Wallet[]>(
      LocalStorage.getItem('walletsToFilter') || []
    );
    const categoriesToFilter = ref<string[]>(
      LocalStorage.getItem('categoriesToFilter') || []
    );
    const operationsToFilter = ref<Operation[]>(
      LocalStorage.getItem('operationsToFilter') || []
    );
    const wallets = walletsStore.getWallets;
    const categories = categoriesStore.getCategories;
    const operations = operationsStore.getOperations;
    const months = computed(() =>
      Array.from(new Set(recordStore.getRecords.map((r) => r.date.slice(0, 7))))
    );
    const monthsToFilter = ref<string[]>(
      LocalStorage.getItem('monthsToFilter') || [months.value[0]]
    );

    watchEffect(() =>
      LocalStorage.set('walletsToFilter', walletsToFilter.value || [])
    );
    watchEffect(() =>
      LocalStorage.set('categoriesToFilter', categoriesToFilter.value || [])
    );
    watchEffect(() =>
      LocalStorage.set('operationsToFilter', operationsToFilter.value || [])
    );
    watchEffect(() => LocalStorage.set('monthsToFilter', monthsToFilter.value));

    const columns = computed(() => [
      'Month',
      'Total',
      ...(categoriesToFilter.value || []),
      ...(operationsToFilter.value?.map((op: Operation) => op.label) || []),
    ]);

    const isRecordsWalletHaveExpense = (rec: Record) => {
      const walletsFilterLabels = walletsToFilter.value.map((w) => w.label);
      for (let i = 0; i < rec.money.length; i++) {
        if (
          rec.money[i].expense &&
          walletsFilterLabels.includes(rec.money[i].wallet)
        )
          return true;
      }
      return false;
    };

    const getRecordsWalletExpense = (rec: Record, walletLabel: string) => {
      return rec.money.find((m) => m.wallet === walletLabel)?.expense || 0;
    };

    const getAllRecordsWalletsExpense = (rec: Record) => {
      return walletsToFilter.value.reduce(
        (acc, w) => (acc += getRecordsWalletExpense(rec, w.label)),
        0
      );
    };

    const filteredRecords = computed(() =>
      recordStore.getRecords.filter(
        (rec) =>
          monthsToFilter.value.includes(rec.date.slice(0, 7)) &&
          isRecordsWalletHaveExpense(rec)
      )
    );

    const getExpensesByCategories = (records: Record[]) => {
      return categoriesToFilter.value.map((c) => ({
        [c.toLowerCase()]: records
          .filter((r) => r.operation.category === c)
          .reduce((acc, r) => (acc += getAllRecordsWalletsExpense(r)), 0),
      }));
    };

    const getExpensesByOperations = (records: Record[]) => {
      return operationsToFilter.value.map((op) => ({
        [op.label.toLowerCase()]: records
          .filter((r) => r.operation.label === op.label)
          .reduce((acc, r) => (acc += getAllRecordsWalletsExpense(r)), 0),
      }));
    };

    const getTotalExpenses = (records: Record[]) => {
      return records.reduce(
        (acc, r) => (acc += getAllRecordsWalletsExpense(r)),
        0
      );
    };

    const getRow = (month: string) => {
      const records = filteredRecords.value.filter(
        (fr) => fr.date.slice(0, 7) === month
      );
      return [
        { month },
        { total: getTotalExpenses(records) },
        ...getExpensesByCategories(records),
        ...getExpensesByOperations(records),
      ].reduce((acc, obj) => (acc = { ...acc, ...obj }), {});
    };

    const rows = computed(() => {
      return monthsToFilter.value.map((m) => getRow(m));
    });

    return {
      walletsToFilter,
      wallets,
      categoriesToFilter,
      categories,
      operationsToFilter,
      operations,
      columns,
      rows,
      monthsToFilter,
      months,
      showWallets,
    };
  },
});
</script>
