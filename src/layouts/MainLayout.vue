<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Wallets PWA </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <NavTab v-for="tab in tabs" :key="tab.label" v-bind="tab" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavTab from 'components/NavTab.vue';

const tabs = [
  {
    label: 'Records Table',
    icon: 'payment',
    to: '/',
  },
  {
    label: 'Wallets',
    icon: 'account_balance_wallet',
    to: '/wallets',
  },
  {
    label: 'Operations',
    icon: 'add_card',
    to: '/operations',
  },
  {
    label: 'Wallets Total',
    icon: 'savings',
    to: '/total',
  },
  {
    label: 'About Wallet PWA',
    icon: 'help_outline',
    to: '/about',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavTab,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      tabs: tabs,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
