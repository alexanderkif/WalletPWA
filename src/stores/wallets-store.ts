import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { Wallet } from 'src/components/models';

export const useWalletsStore = defineStore('wallets-store', {
  state: () => ({
    wallets: (LocalStorage.getItem('wallets') || []) as Wallet[],
  }),
  getters: {
    getWallets: (state) => state.wallets,
  },
  actions: {
    storageWallet() {
      LocalStorage.set('wallets', this.wallets);
    },
    setWallets(walletList: Wallet[]) {
      this.wallets = walletList;
      this.storageWallet();
    },
    saveWallet(walletLabel: string) {
      if (this.getWallets.map((w) => w.label).includes(walletLabel)) {
        console.log('Error: wallet exists.');
        return;
      }
      this.wallets.push({ label: walletLabel, hide: false, money: 0 });
      this.storageWallet();
    },
    removeWallet(wallet: Wallet) {
      this.wallets = this.wallets.filter((w) => w.label !== wallet.label);
      this.storageWallet();
    },
  },
});
