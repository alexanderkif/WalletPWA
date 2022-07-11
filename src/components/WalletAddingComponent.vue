<template>
  <div class="q-px-md full-width">
    <q-btn
      color="positive"
      icon="add"
      glossy
      label="Add Wallet"
      @click="openAddWalletDialog"
    />
    <q-dialog
      v-model="addDialogOpened"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section class="row items-center" style="width: 250px">
          <q-input
            ref="inputWalletNameRef"
            outlined
            v-model="walletName"
            label="Wallet name"
            class="col"
            :rules="[
              (val) => val.length > 2 || 'Please use minimum 3 characters',
            ]"
            @keyup.enter="saveWallet"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save wallet" color="primary" @click="saveWallet" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { useWalletsStore } from 'src/stores/wallets-store';
import { QInput } from 'quasar';

export default defineComponent({
  name: 'WalletAddingComponent',
  setup() {
    const walletsStore = useWalletsStore();
    const inputWalletNameRef = ref<QInput>();

    const addDialogOpened = ref(false);
    const walletName = ref('');

    async function openAddWalletDialog() {
      walletName.value = '';
      addDialogOpened.value = true;
      await nextTick();
      inputWalletNameRef.value?.$el?.focus();
    }

    function saveWallet() {
      if (walletName.value.length < 3) return;
      walletsStore.saveWallet(walletName.value);
      walletName.value = '';
      inputWalletNameRef.value?.resetValidation();
      addDialogOpened.value = false;
    }

    return {
      openAddWalletDialog,
      addDialogOpened,
      saveWallet,
      walletName,
      inputWalletNameRef,
    };
  },
});
</script>
