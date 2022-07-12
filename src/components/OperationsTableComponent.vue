<template>
  <div class="q-pa-md full-width">
    <q-table
      title="Operations"
      :rows="operationsStore.getOperations"
      :columns="columns"
      row-key="value"
      v-model:pagination="initialPagination"
      no-data-label="No Operations found"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="label" :props="props">
            {{ props.row.label }}
          </q-td>
          <q-td key="category" :props="props">
            {{ props.row.category }}
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="deleteOperation(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="confirmDeleteDialogOpened"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-negative text-white">
        <q-card-section class="row text-center text-h6">
          Do you really want to delete Operation <br />"{{
            operationToRemove?.label
          }}"?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="No" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Yes"
            color="negative"
            @click="deleteOperationConfirmed"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { Operation } from './models';
import { useOperationsStore } from 'src/stores/operations-store';
import { LocalStorage, QTableProps } from 'quasar';

const columns: QTableProps['columns'] = [
  {
    name: 'label',
    required: true,
    label: 'Label',
    align: 'left',
    field: (row: Operation) => row.label,
    // format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'category',
    label: 'Category',
    align: 'left',
    field: (row: Operation) => row.category,
  },
  {
    name: 'delete',
    label: 'Delete',
    align: 'center',
    field: 'delete',
  },
];

export default defineComponent({
  name: 'OperationsTableComponent',
  setup() {
    const confirmDeleteDialogOpened = ref(false);
    const operationToRemove = ref<Operation>();
    const operationsStore = useOperationsStore();

    const changedHide = () => {
      operationsStore.storageOperations();
    };

    const deleteOperation = (Operation: Operation) => {
      operationToRemove.value = Operation;
      confirmDeleteDialogOpened.value = true;
    };

    const deleteOperationConfirmed = () => {
      if (operationToRemove.value)
        operationsStore.removeOperation(operationToRemove.value);
      confirmDeleteDialogOpened.value = false;
    };

    const initialPagination = ref<QTableProps['pagination']>({
      sortBy: 'date',
      descending: true,
      page: 1,
      rowsPerPage:
        (LocalStorage.getItem('operationsRowsPerPage') as number) || 5,
    });

    watchEffect(() => {
      LocalStorage.set(
        'operationsRowsPerPage',
        initialPagination.value?.rowsPerPage
      );
    });

    return {
      confirmDeleteDialogOpened,
      operationsStore,
      columns,
      changedHide,
      operationToRemove,
      deleteOperation,
      deleteOperationConfirmed,
      initialPagination,
    };
  },
});
</script>
