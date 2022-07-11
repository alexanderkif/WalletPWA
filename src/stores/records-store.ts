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
    saveRecord(record: Record) {
      if (!record.id) record.id = +new Date().toISOString().replace(/\D/g, '');
      else this.removeRecord(record.id);
      this.records.push(record);
      this.storageRecords();
    },
    removeRecord(id: number) {
      this.records = this.records.filter((r) => r.id !== id);
      this.storageRecords();
    },
  },
});
