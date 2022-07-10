<template>
  <div class="q-px-md full-width">
    <q-btn
      color="positive"
      icon="add"
      glossy
      label="Add Operation"
      @click="openAddOperationDialog"
    />
    <q-dialog
      v-model="addDialogOpened"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section class="row items-center" style="width: 250px">
          <div class="row full-width">
            <q-input
              ref="inputOperationNameRef"
              outlined
              v-model="operationName"
              label="Operation name"
              class="col"
              :rules="[
                (val) => val.length > 2 || 'Please use minimum 3 characters',
              ]"
              @keyup.enter="saveOperation"
            />
          </div>
          <q-select
            outlined
            class="q-mt-sm full-width"
            v-model="category"
            :options="categories"
            label="Category"
            use-input
            input-debounce="0"
            @filter="filterFn"
            style="width: 250px"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Save Operation"
            color="primary"
            @click="saveOperation"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="addCategoryDialogOpened"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card>
        <q-card-section class="row items-center" style="width: 250px">
          <q-input
            ref="inputCategoryRef"
            outlined
            v-model="categoryName"
            label="Gategory name"
            class="col"
            :rules="[
              (val) => val.length > 2 || 'Please use minimum 3 characters',
            ]"
            @keyup.enter="saveCategory"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Save gategory"
            color="primary"
            @click="saveCategory"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed, watchEffect } from 'vue';
import { QInput } from 'quasar';
import { useCategoriesStore } from 'src/stores/categories-store';
import { useOperationsStore } from 'src/stores/operations-store';

export default defineComponent({
  name: 'OperationAddingComponent',
  setup() {
    const operationsStore = useOperationsStore();
    const categoriesStore = useCategoriesStore();
    const inputOperationNameRef = ref<QInput>();
    const inputCategoryRef = ref<QInput>();

    const addDialogOpened = ref(false);
    const operationName = ref('');
    const categoryName = ref('');
    const category = ref('');
    const categories = ref<string[]>();
    const categoriesAll = computed(() => [
      ...categoriesStore.getCategories,
      'Add category',
    ]);
    const addCategoryDialogOpened = ref(false);

    watchEffect(async () => {
      if (category.value === 'Add category') {
        console.log('category.value', category.value);
        addCategoryDialogOpened.value = true;
        await nextTick();
        inputCategoryRef.value?.$el?.focus();
        category.value = '';
      }
    });

    async function openAddOperationDialog() {
      operationName.value = '';
      addDialogOpened.value = true;
      await nextTick();
      inputOperationNameRef.value?.$el?.focus();
    }

    function saveOperation() {
      if (operationName.value.length < 3) return;
      operationsStore.addOperation(operationName.value, category.value);
      operationName.value = '';
      inputOperationNameRef.value?.resetValidation();
      addDialogOpened.value = false;
    }

    function saveCategory() {
      if (categoryName.value.length < 3) return;
      categoriesStore.addCategory(categoryName.value);
      category.value = categoryName.value;
      categoryName.value = '';
      inputCategoryRef.value?.resetValidation();
      addCategoryDialogOpened.value = false;
    }

    const filterFn = function (
      val: string,
      update: (arg0: { (): void; (): void }) => void
    ) {
      if (val === '') {
        update(() => {
          categories.value = categoriesAll.value;

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        categories.value = categoriesAll.value.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    return {
      openAddOperationDialog,
      addDialogOpened,
      saveOperation,
      operationName,
      inputOperationNameRef,
      category,
      categories,
      filterFn,
      categoryName,
      addCategoryDialogOpened,
      inputCategoryRef,
      saveCategory,
    };
  },
});
</script>
