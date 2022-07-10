import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { Operation } from 'src/components/models';

export const useOperationsStore = defineStore('operations-store', {
  state: () => ({
    operations: (LocalStorage.getItem('operations') || []) as Operation[],
  }),
  getters: {
    getOperations: (state) => state.operations,
  },
  actions: {
    storageOperations() {
      LocalStorage.set('operations', this.operations);
    },
    setOperations(operationsList: Operation[]) {
      this.operations = operationsList;
      this.storageOperations();
    },
    addOperation(operationName: string, category: string) {
      const ids = this.operations.map((w) => w.value);
      let id = 1;
      while (ids.includes(id)) {
        id++;
      }
      const newOperation: Operation = {
        value: id,
        label: operationName,
        category: category,
      };
      console.log('addOperations', newOperation);
      this.operations.push(newOperation);
      this.storageOperations();
    },
    removeOperation(operationToRemove: Operation) {
      this.operations = this.operations.filter(
        (w) => w.value !== operationToRemove.value
      );
      this.storageOperations();
    },
  },
});
