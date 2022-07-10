import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

export const useCategoriesStore = defineStore('categories-store', {
  state: () => ({
    categories: (LocalStorage.getItem('categories') || []) as string[],
  }),
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    storageCategories() {
      LocalStorage.set('categories', this.categories);
    },
    setCategories(categoriesList: string[]) {
      this.categories = categoriesList;
      this.storageCategories();
    },
    addCategory(category: string) {
      this.categories.push(category);
      this.storageCategories();
    },
    removeCategorie(categorieToRemove: string) {
      this.categories = this.categories.filter((w) => w !== categorieToRemove);
      this.storageCategories();
    },
  },
});
