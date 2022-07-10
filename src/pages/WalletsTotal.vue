<template>
  <q-page class="row items-start justify-center q-pt-md">
    <TotalComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TotalComponent from 'components/TotalComponent.vue';

export default defineComponent({
  name: 'WalletsTotal',
  components: {
    TotalComponent,
  },
  setup() {
    return {};
  },
});
</script>
