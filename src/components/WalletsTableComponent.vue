<template>
  <div class="q-pa-md full-width">
    <q-table
      title="Wallets"
      :rows="walletsStore.getWallets"
      :columns="columns"
      row-key="value"
      v-model:pagination="initialPagination"
      no-data-label="No wallets found"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- <q-td key="value" :props="props">
            {{ props.row.value }}
          </q-td> -->
          <q-td key="label" :props="props">
            {{ props.row.label }}
          </q-td>
          <q-td key="money" :props="props">
            {{ props.row.money }}
          </q-td>
          <q-td key="hide" :props="props">
            <q-checkbox
              v-model="props.row.hide"
              color="positive"
              @update:model-value="changedHide"
            />
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="deleteWallet(props.row)"
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
          Do you really want to delete wallet <br />"{{
            walletToRemove?.label
          }}"?
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="No" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Yes"
            color="negative"
            @click="deleteWalletConfirmed"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { Wallet } from './models';
import { useWalletsStore } from 'src/stores/wallets-store';
import { LocalStorage, QTableProps } from 'quasar';

const columns: QTableProps['columns'] = [
  {
    name: 'label',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row: Wallet) => row.label,
    // format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'money',
    label: 'Money',
    align: 'left',
    field: (row: Wallet) => row.money,
  },
  {
    name: 'hide',
    label: 'Hide in records',
    align: 'left',
    field: (row: Wallet) => row.hide,
  },
  {
    name: 'delete',
    label: 'Delete',
    align: 'center',
    field: 'delete',
  },
];

export default defineComponent({
  name: 'WalletsTableComponent',
  setup() {
    const confirmDeleteDialogOpened = ref(false);
    const walletToRemove = ref<Wallet>();
    const walletsStore = useWalletsStore();

    const changedHide = () => {
      walletsStore.storageWallet();
    };

    const deleteWallet = (wallet: Wallet) => {
      walletToRemove.value = wallet;
      confirmDeleteDialogOpened.value = true;
    };

    const deleteWalletConfirmed = () => {
      if (walletToRemove.value) walletsStore.removeWallet(walletToRemove.value);
      confirmDeleteDialogOpened.value = false;
    };

    const initialPagination = ref<QTableProps['pagination']>({
      rowsPerPage: (LocalStorage.getItem('walletsRowsPerPage') as number) || 5,
    });

    watchEffect(() => {
      LocalStorage.set(
        'walletsRowsPerPage',
        initialPagination.value?.rowsPerPage
      );
    });

    return {
      confirmDeleteDialogOpened,
      walletsStore,
      columns,
      changedHide,
      walletToRemove,
      deleteWallet,
      deleteWalletConfirmed,
      initialPagination,
    };
  },
});
</script>
