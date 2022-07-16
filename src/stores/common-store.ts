import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const useCommonStore = defineStore('common-store', {
  state: () => ({
    showTotalOnRecords: (LocalStorage.getItem('showTotalOnRecords') ||
      false) as boolean,
  }),
  getters: {
    getShowTotalOnRecords: (state) => state.showTotalOnRecords,
  },
  actions: {
    storageValues() {
      LocalStorage.set('showTotalOnRecords', this.showTotalOnRecords);
    },
    setShowTotalOnRecords(showTotalOnRecords: boolean) {
      this.showTotalOnRecords = showTotalOnRecords;
      this.storageValues();
    },
  },
});
