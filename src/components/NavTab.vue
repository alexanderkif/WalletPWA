<template>
  <q-item
    clickable
    tag="a"
    :to="to"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavTab',
  props: {
    label: {
      type: String,
      required: true
    },

    to: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
});
</script>
