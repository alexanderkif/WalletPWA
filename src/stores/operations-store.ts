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
    addOperation(operation: Operation) {
      this.operations.push(operation);
      this.storageOperations();
    },
    removeOperation(operationToRemove: Operation) {
      this.operations = this.operations.filter(
        (w) =>
          w.label !== operationToRemove.label &&
          w.category !== operationToRemove.category
      );
      this.storageOperations();
    },
  },
});
