<template>
  <q-dialog
    v-model="addRecordDialogOpened"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-input outlined v-model="date" class="col col-6" mask="####-##-##">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="date"
                  mask="YYYY-MM-DD"
                  @update:model-value="qDateProxy.hide()"
                  first-day-of-week="1"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <span v-if="record?.id" class="q-ml-md text-grey-5">{{
          `Id: ${record?.id}`
        }}</span>
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-select
          outlined
          class="col col-6"
          v-model="operation"
          :options="operations"
          label="Operation"
          use-input
          input-debounce="0"
          @filter="filterOperationsFn"
        />
        <q-input
          outlined
          disable
          v-model="category"
          label="Category"
          class="col col-6 q-pl-md"
        />
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-select
          outlined
          class="col col-6"
          v-model="walletExpense"
          :options="wallets"
          label="Wallet expense"
          use-input
          input-debounce="0"
          @filter="filterWalletsFn"
        />
        <q-input
          outlined
          v-model="expense"
          label="Expense"
          class="col col-6 q-pl-md"
          :rules="[(val) => !val || val == +val || 'Must be number']"
          hide-bottom-space
        />
      </q-card-section>
      <q-card-section class="row justify-center">
        <q-select
          outlined
          class="col col-6"
          v-model="walletIncome"
          :options="wallets"
          label="Wallet income"
          use-input
          input-debounce="0"
          @filter="filterWalletsFn"
        />
        <q-input
          outlined
          v-model="income"
          label="Income"
          class="col col-6 q-pl-md"
          :rules="[(val) => !val || val == +val || 'Must be number']"
          hide-bottom-space
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Save record" color="primary" @click="saveRecord" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { QInput } from 'quasar';
import { useOperationsStore } from 'src/stores/operations-store';
import { useRecordStore } from 'src/stores/records-store';
import { useWalletsStore } from 'src/stores/wallets-store';
import { Money, Operation, Record } from 'src/components/models';

export default defineComponent({
  name: 'RecordDialogComponent',
  setup() {
    const operationsStore = useOperationsStore();
    const recordStore = useRecordStore();
    const walletsStore = useWalletsStore();

    const date = ref(new Date().toISOString().split('T')[0]);
    const operation = ref<Operation>();
    const category = computed(() => operation.value?.category);
    const operations = ref();
    const inputOperationNameRef = ref<QInput>();

    const addRecordDialogOpened = ref(false);
    const addOperationDialogOpened = ref(false);

    const expense = ref<number>();
    const income = ref<number>();

    const walletExpense = ref();
    const walletIncome = ref();
    const wallets = ref(walletsStore.getWallets);
    const qDateProxy = ref();
    const record = ref<Record>();

    async function openAddRecordDialog(row: Record) {
      record.value = row;
      if (row?.date) date.value = row.date;
      if (row?.operation) operation.value = row.operation;
      if (row?.money) {
        row.money.map((m) => {
          if (m.hasOwnProperty('income')) {
            walletIncome.value = walletsStore.getWallets.find(
              (w) => w.label === m.wallet
            );
            income.value = m.income;
          }
          if (m.hasOwnProperty('expense')) {
            walletExpense.value = walletsStore.getWallets.find(
              (w) => w.label === m.wallet
            );
            expense.value = m.expense;
          }
        });
      }
      addRecordDialogOpened.value = true;
    }

    function saveRecord() {
      if (
        !date.value ||
        !operation.value ||
        !(
          (walletExpense.value && expense.value) ||
          (walletIncome.value && income.value)
        )
      )
        return;

      const money: Money[] = [];
      if (walletExpense.value) {
        money.push({
          wallet: walletExpense.value.label,
          expense: +(expense.value || 0),
        });
      }
      if (walletIncome.value) {
        money.push({
          wallet: walletIncome.value.label,
          income: +(income.value || 0),
        });
      }

      recordStore.saveRecord({
        id: record.value?.id,
        date: date.value,
        operation: operation.value,
        money,
      });
      inputOperationNameRef.value?.resetValidation();
      addRecordDialogOpened.value = false;
      operation.value = undefined;
      expense.value = 0;
      income.value = 0;
      walletExpense.value = '';
      walletIncome.value = '';
      record.value = undefined;
    }

    const filterOperationsFn = function (
      val: string,
      update: (arg0: { (): void; (): void }) => void
    ) {
      if (val === '') {
        update(() => {
          operations.value = operationsStore.getOperations;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        operations.value = operationsStore.getOperations.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterWalletsFn = function (
      val: string,
      update: (arg0: { (): void; (): void }) => void
    ) {
      if (val === '') {
        update(() => {
          wallets.value = walletsStore.getWallets;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        wallets.value = walletsStore.getWallets.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    return {
      openAddRecordDialog,
      addRecordDialogOpened,
      saveRecord,
      date,
      operation,
      operations,
      category,
      addOperationDialogOpened,
      inputOperationNameRef,
      filterOperationsFn,
      filterWalletsFn,
      expense,
      income,
      wallets,
      walletExpense,
      walletIncome,
      qDateProxy,
      record,
    };
  },
});
</script>
