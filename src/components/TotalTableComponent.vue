<template>
  <div class="q-pa-md full-width">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="value"
      v-model:pagination="initialPagination"
      no-data-label="No records found"
    >
    </q-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue';
import { LocalStorage, QTableProps } from 'quasar';

export default defineComponent({
  name: 'TotalTableComponent',
  props: {
    totalColumns: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    totalRows: {
      type: Array,
    },
  },
  setup(props) {
    const columns = computed<QTableProps['columns']>(() => {
      return props.totalColumns.map((c) => ({
        name: c.toLowerCase(),
        label: c,
        align: 'right',
        field: c.toLowerCase(),
      }));
    });

    const rows = computed(() => props.totalRows);

    const initialPagination = ref<QTableProps['pagination']>({
      page: 1,
      rowsPerPage:
        (LocalStorage.getItem('totalTableRowsPerPage') as number) || 5,
    });

    watchEffect(() => {
      LocalStorage.set(
        'totalTableRowsPerPage',
        initialPagination.value?.rowsPerPage
      );
    });

    return {
      columns,
      rows,
      initialPagination,
    };
  },
});
</script>
