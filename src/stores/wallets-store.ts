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
    addWallet(walletLabel: string) {
      // const ids = this.wallets.map((w) => w.id);
      // let id = 1;
      // while (ids.includes(id)) {
      //   id++;
      // }
      // const value = new Date()
      //   .toISOString()
      //   .split('T')
      //   .map((el, idx) => (idx ? el.split('.')[0] : el.split('-').join('/')))
      //   .join(' ');
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
