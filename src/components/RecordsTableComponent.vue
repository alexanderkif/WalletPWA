<template>
  <div class="record-table q-pa-md full-width">
    <q-table
      :rows="rowsAllFields"
      :columns="columns"
      class="my-sticky-virtscroll-table"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="date"
      title="Records"
      no-data-label="No records found"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="operationText" :props="props">
            {{ props.row.operationText }}
          </q-td>
          <q-td key="category" :props="props">
            {{ props.row.category }}
          </q-td>
          <q-td
            :key="walletColumn.name"
            v-for="walletColumn in walletsColumn"
            :props="props"
          >
            {{ props.row[walletColumn.name] }}
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="deleteRecord(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <q-dialog
    v-model="confirmDeleteDialogOpened"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-negative text-white">
      <q-card-section class="row text-center text-h6">
        Do you really want to delete record <br />"{{
          `${recordToRemove?.date} ${recordToRemove?.operationText}`
        }}"?
      </q-card-section>

      <q-card-actions align="right" class="bg-white">
        <q-btn flat label="No" color="secondary" v-close-popup />
        <q-btn
          flat
          label="Yes"
          color="negative"
          @click="deleteRecordConfirmed"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance } from 'vue';
import { QTableProps } from 'quasar';
import { useWalletsStore } from 'src/stores/wallets-store';
import { useOperationsStore } from 'src/stores/operations-store';
import { useRecordStore } from 'src/stores/records-store';
import { Record } from './models';

export default defineComponent({
  name: 'RecordsTableComponent',
  setup() {
    const confirmDeleteDialogOpened = ref(false);
    const walletsStore = useWalletsStore();
    const operationsStore = useOperationsStore();
    const recordStore = useRecordStore();
    const recordToRemove = ref<Record>();

    const walletsColumn = computed(() => {
      const columnsToAdd: QTableProps['columns'] = [];
      walletsStore.getWallets
        .filter((w) => !w.hide)
        .map((w) => [
          columnsToAdd.push(
            {
              name: `i_${w.label}`,
              label: `Inc ${w.label}`,
              align: 'left',
              field: (row: Record) => row[`i_${w.label}`],
              classes: 'incomeColumn',
              headerStyle: 'background-color: rgb(222, 255, 222);',
            },
            {
              name: `e_${w.label}`,
              label: `Exp ${w.label}`,
              align: 'left',
              field: (row: Record) => row[`e_${w.label}`],
              classes: 'expenseColumn',
              headerStyle: 'background-color: rgb(255, 222, 222);',
            }
          ),
        ]);
      return columnsToAdd;
    });

    const columns: QTableProps['columns'] = [
      {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        // format: (val) => `${val}`,
        field: (row: Record) => row.date,
      },
      {
        name: 'operationText',
        required: true,
        label: 'Operation',
        align: 'left',
        field: (row: Record) => row.operationText,
        sortable: true,
      },
      {
        name: 'category',
        required: true,
        label: 'Category',
        align: 'left',
        field: (row: Record) => row.category,
        sortable: true,
      },
      ...walletsColumn.value,
      {
        name: 'delete',
        label: 'Delete',
        align: 'center',
        field: 'delete',
      },
    ];

    const deleteRecord = (record: Record) => {
      recordToRemove.value = record;
      confirmDeleteDialogOpened.value = true;
    };
    const instance = getCurrentInstance();

    const deleteRecordConfirmed = () => {
      if (recordToRemove.value) recordStore.removeRecord(recordToRemove.value);
      confirmDeleteDialogOpened.value = false;
      instance?.proxy?.$forceUpdate();
    };

    const rowsAllFields = computed(() => {
      const wcNames = walletsColumn.value.map((wc) => wc.name?.split('_')[1]);
      return recordStore.getRecords.map((row) => {
        row.money.map((m) => {
          if (m.wallet && wcNames.includes(m.wallet)) {
            row[`i_${m.wallet}`] = m.income;
            row[`e_${m.wallet}`] = m.expense;
          }
        });
        const oper = operationsStore.getOperations.find(
          (op) => row.operation === op.value
        );
        row.operationText = oper?.label;
        row.category = oper?.category;
        return row;
      });
    });

    return {
      columns,
      rowsAllFields,
      pagination: ref({
        rowsPerPage: 0,
      }),
      walletsStore,
      walletsColumn,
      deleteRecord,
      deleteRecordConfirmed,
      recordToRemove,
      confirmDeleteDialogOpened,
      recordStore,
    };
  },
});
</script>

<style lang="scss">
.record-table {
  .my-sticky-virtscroll-table {
    /* height or max-height is important */
    height: calc(100vh - 134px);

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th {
      /* bg color is important for th; just specify one */
      background-color: #fff;
    }

    thead tr th {
      position: sticky;
      z-index: 1;
    }
    /* this will be the loading indicator */
    thead tr:last-child th {
      /* height of all previous header rows */
      top: 48px;
    }
    thead tr:first-child th {
      top: 0;
    }
  }
  .incomeColumn {
    background-color: rgb(243, 255, 243);
  }
  .expenseColumn {
    background-color: rgb(255, 243, 243);
  }
}
</style>
