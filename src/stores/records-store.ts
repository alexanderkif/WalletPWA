import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { Record } from 'src/components/models';

export const useRecordStore = defineStore('record-store', {
  state: () => ({
    records: (LocalStorage.getItem('records') || []) as Record[],
  }),
  getters: {
    getRecords: (state): Record[] => state.records,
  },
  actions: {
    storageRecords() {
      LocalStorage.set('records', this.records);
    },
    setRecords(recordsList: Record[]) {
      this.records = recordsList;
      this.storageRecords();
    },
    addRecord(record: Record) {
      console.log('addRecord', record);
      // const date = new Date()
      //   .toISOString()
      //   .split('T')
      //   .map((el, idx) => (idx ? el.split('.')[0] : el.split('-').join('/')))
      //   .join(' ');
      this.records.push(record);
      this.storageRecords();
    },
    removeRecord(record: Record) {
      this.records = this.records.filter((r) => r !== record);
      this.storageRecords();
    },
  },
});
