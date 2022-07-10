<template>
  <q-page class="column full-width">
    <RecordAddingComponent class="col-auto q-mt-md" />
    <RecordsTableComponent class="col" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RecordAddingComponent from 'components/RecordAddingComponent.vue';
import RecordsTableComponent from 'components/RecordsTableComponent.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    RecordAddingComponent,
    RecordsTableComponent,
  },
  setup() {
    return {};
  },
});
</script>
