<template>
  <q-page class="col full-width">
    <WalletAddingComponent class="q-mt-md" />
    <WalletsTableComponent />
  </q-page>
</template>

<script lang="ts">
import {} from 'components/models';
import WalletAddingComponent from 'components/WalletAddingComponent.vue';
import WalletsTableComponent from 'components/WalletsTableComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WalletsPage',
  components: {
    WalletAddingComponent,
    WalletsTableComponent,
  },
  setup() {
    return {};
  },
});
</script>
