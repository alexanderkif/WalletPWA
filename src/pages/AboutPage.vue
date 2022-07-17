<template>
  <q-page class="row items-start q-pa-md">
    <q-card class="my-card full-width">
      <q-card-section>
        The program is free for personal use.<br />
        The application stores all data only in your browser. If you clear your
        browsing data, you will lose your records.<br />
        You can save your data to an Excel file. And restore on this or any
        other device.<br />
        You are responsible for yourself and everything you do.
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">Add wallets</div>
        <q-img src="../assets/wallet.png" fit="cover" />
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">
          Add operations. Use the last item in the list to add categories.
        </div>
        <q-img src="../assets/operation.png" fit="cover" />
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2">Now you can add records.</div>
        <q-img src="../assets/record.png" fit="cover" />
      </q-card-section>
      <q-card-section>
        <div class="col-12 row justify-start q-mb-md">
          Copyright © 2022 Aleksandr Nikiforov. All rights reserved.
          <br />
          <span class="col-12 row justify-start q-mb-md text-caption">
            linkedin.com/in/aleksandr-nikiforov-8a417712a
          </span>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutPage',
  setup() {
    return {};
  },
});
</script>
